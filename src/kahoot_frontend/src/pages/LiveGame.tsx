import { useLocation, useNavigate } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { FaUnlock, FaLock } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { settingUniquePlayers } from "../../stores/user-slice";
import { formatGamePin, getSocket } from "../helper/helper";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.close as any;
  },
});

function LiveGame() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const socket = getSocket();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [locked, setLocked] = useState(false);
  const { search } = useLocation();
  const [uniquePlayers, setUniquePlayers] = useState([]);
  const queryParams = new URLSearchParams(search);
  const gamePin = queryParams.get("gamePin");
  const { currentPickedKahoot } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (!state?.routerPrincipal) {
      navigate("/");
      return;
    }
    socket.emit("join_game", { gamePin: gamePin });

    socket.on("player_joined", (data: any) => {
      const thePlayer = {
        ...data.thePlayer,
        totalScore: 0,
        currentScore: 0,
        questionIndex: 0,
        previousScore: 0,
        answer: -1,
      };
      setUniquePlayers((prevState: any) => {
        for (let i = 0; i < prevState.length; i++) {
          if (prevState[i].owner === thePlayer.owner) {
            return prevState;
          }
        }
        return [...prevState, thePlayer];
      });
    });
    socket.on("player_left", (data: any) => {
      setUniquePlayers((prevState: any) => {
        const findIndex = prevState?.find(
          (thePlayer: any) => thePlayer?.owner === data?.principal
        );
        if (findIndex) {
          let temp = [...prevState];
          temp.splice(findIndex, 1);
          return temp;
        }
        return prevState;
      });
    });

    const handleBeforeUnload = (event: any) => {
      socket.emit("admin_left", { gamePin: gamePin });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      socket.off("player_joined");
      socket.off("player_left");
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="live-game">
      <div className="h-[15vh] lg:hidden bg-white flex justify-center items-center flex-col gap-y-1">
        {!locked ? (
          <div className="flex justify-center items-center flex-col gap-y-1">
            <p className="text-black text-center text-[14px] px-[10px]">
              Join at{" "}
              <span className="font-bold">
                https://cv2ns-7iaaa-aaaac-aac3q-cai.icp0.io/
              </span>
            </p>
            <p className="text-black text-[14px]">
              with game code:{" "}
              <span
                onClick={async () => {
                  await navigator.clipboard.writeText(gamePin ?? "");
                  Toast.fire({
                    icon: "success",
                    title: "Successfully copied the game pin!",
                    position: "bottom-end",
                  });
                }}
                className="font-bold cursor-pointer"
              >
                {formatGamePin(gamePin ?? "")}
              </span>
            </p>
          </div>
        ) : (
          <div className="text-black text-center text-[14px] font-semibold px-[10px] gap-y-2 flex flex-col items-center gap-y-1 gap-x-2">
            This game is now locked - no one else can join <FaLock />
          </div>
        )}
      </div>
      <div className="hidden lg:flex gamepin-container">
        <div className="gamepin-subcontainer">
          <div className="gamepin-innercontainer">
            <div className="gamepin-3">
              <div className="gamepin-4">
                <div className="gamepin-left">
                  <div className="gamepin-left-inner px-[10px]">
                    <p>Join at</p>
                    <p className="font-bold">
                      https://cv2ns-7iaaa-aaaac-aac3q-cai.icp0.io/
                    </p>
                  </div>
                </div>
                {!locked ? (
                  <div className="gamepin-right flex items-start flex-col gap-y-4">
                    <p className="gamepin-text-right">Game Code:</p>
                    <p
                      onClick={async () => {
                        await navigator.clipboard.writeText(gamePin ?? "");
                        Toast.fire({
                          icon: "success",
                          title: "Successfully copied the game pin!",
                          position: "top-right",
                        });
                      }}
                      className="cursor-pointer the-pin"
                    >
                      {formatGamePin(gamePin ?? "")}
                    </p>
                  </div>
                ) : (
                  <div className="gamepin-right flex items-center justify-center gap-y-4">
                    <div className="the-dark-bg h-full flex flex-col justify-center items-center px-[10px] mr-[10px] rounded-[8px]">
                      <FaLock size="30px" color="white" />
                    </div>
                    <p className="text-[16px] text-black monserrat font-semibold">
                      This game is now locked
                      <br />
                      no one else can join
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-col items-center mt-4 md:mt-1">
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => {
              socket.emit("admin_left", { gamePin: gamePin });
              navigate(`/profile`, {
                state: {
                  routerPrincipal: state.routerPrincipal,
                },
              });
            }}
            className={`lock-btn font-bold`}
          >
            Exit
          </button>
          <img className="w-[150px] md:w-[200px]" src="kahoot-2.png" />
          <div className="flex gap-x-2">
            <button
              onClick={() => {
                setLocked((prevState) => !prevState);
                socket.emit("toggle_lock_game", { gamePin });
              }}
              className={`${!locked ? "lock-btn" : "lock-btn-lock"} font-bold`}
            >
              {locked ? <FaLock size="20px" /> : <FaUnlock size="20px" />}
            </button>
            <button
              onClick={() => {
                dispatch(settingUniquePlayers([...uniquePlayers]));
                socket.emit("game_started", {
                  gamePin: gamePin,
                  questions: currentPickedKahoot?.questions,
                });
                navigate(`/show-quiz-title?gamePin=${gamePin}`, {
                  state: {
                    routerPrincipal: state.routerPrincipal,
                  },
                });
              }}
              disabled={uniquePlayers?.length <= 0}
              className="lock-btn font-bold"
            >
              Start
            </button>
          </div>
        </div>
        <div className="h-[65vh] md:h-[58vh] overflow-auto">
          <div className="flex flex-wrap w-full items-start justify-center h-full">
            {uniquePlayers?.length > 0 ? (
              uniquePlayers?.map((owner: any, index: number) => (
                <div className="mt-4 flex items-center glowing-container flex-wrap relative user-container overflow-y-auto">
                  <button className="user-button">
                    <div className="user-avatar">
                      <IoPersonCircle size={isMobile ? "25px" : "45px"} />
                    </div>
                    <span
                      onClick={() => {
                        socket.emit("kick_player", {
                          gamePin: gamePin,
                          principal: owner?.owner,
                          nickname: owner?.nickname,
                        });
                        setUniquePlayers((prevState) => {
                          let temp = [...prevState];
                          temp.splice(index, 1);
                          return temp;
                        });
                      }}
                      className="hover:line-through"
                    >
                      {owner?.nickname?.length > 15
                        ? owner?.nickname?.slice(0, 15) + "..."
                        : owner?.nickname ?? ""}
                    </span>
                  </button>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-full">
                <div className="glowing-container p-[15px] rounded-[5px]">
                  <p className="text-[20px] md:text-[24px]">
                    Waiting for other players...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <img
          className="w-[150px] md:w-[200px] absolute bottom-2 left-2 cursor-pointer"
          src="kahoot-2.png"
        />
      </div>
      <div className="player-absolute absolute bottom-2 right-2 flex gap-x-2">
        <IoPersonCircle size="32px" className="ml-2" />
        <p className="player-absolute-text mr-5">
          {uniquePlayers?.length ?? 0}
        </p>
      </div>
    </div>
  );
}

export default LiveGame;
