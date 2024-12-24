import { FaArrowDown, FaCircle, FaPlus, FaSquareFull } from "react-icons/fa6";
import { IoTriangleSharp } from "react-icons/io5";
import { MdHexagon } from "react-icons/md";

interface Props {
  quizData: any;
  clickedQuizIndex: number;
  setQuizData: (arg: any) => void;
  handleDragLeave: () => void;
  handleDragOver: (arg: any) => void;
  handleDrop: (arg: any) => void;
  setIsOpen: (arg: any) => void;
  dragging: boolean;
  setMouseEnter1: (arg: any) => void;
  setMouseEnter2: (arg: any) => void;
  setMouseEnter3: (arg: any) => void;
  setMouseEnter4: (arg: any) => void;
  mouseEnter1: boolean;
  mouseEnter2: boolean;
  mouseEnter3: boolean;
  mouseEnter4: boolean;
}

export const MiddleComponentNonMobile = ({
  quizData,
  clickedQuizIndex,
  setQuizData,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  setIsOpen,
  dragging,
  setMouseEnter1,
  setMouseEnter2,
  setMouseEnter3,
  setMouseEnter4,
  mouseEnter1,
  mouseEnter2,
  mouseEnter3,
  mouseEnter4,
}: Props) => {
  return (
    <div className="middle-div flex-1">
      <div className="question-div glowing-container">
        <div className="question-inner-div ">
          <div className="question-sub-inner-div ">
            <div className="question-1-div">
              <div className="question-2-div">
                <input
                  maxLength={120}
                  value={quizData?.[clickedQuizIndex]?.question ?? ""}
                  onChange={(e) => {
                    let quizDataTemp = [...quizData];
                    quizDataTemp[clickedQuizIndex].question = e.target.value;
                    setQuizData([...quizDataTemp]);
                  }}
                  placeholder="Start typing your question"
                  className="w-full text-center text-[25px] font-bold  question-p bg-transparent border-transparent outline-none"
                  type="text"
                />
                <p className="absolute top-1 text-gray right-1 text-[14px] font-semibold">
                  {120 - quizData?.[clickedQuizIndex].question?.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-full">
        <div
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => setIsOpen(true)}
          className={`upload-div ${"upload-div-quiz"} glowing-container px-[40px] cursor-pointer gap-y-[16px]`}
        >
          {quizData?.[clickedQuizIndex]?.imageUrl === "cdn.svg" ? (
            <div className="flex flex-col gap-y-[16px] justify-center items-center">
              <img src="/walaoeh.svg" className="rounded-b-[0.25rem]" />
              <div className="btn-upload-div">
                <FaPlus size="32px" className="block mx-auto" color="black" />
              </div>
              <div>
                <p className="text-black">
                  <span className="text-gray font-semibold underline">
                    Upload file
                  </span>{" "}
                  or drag here to upload
                </p>
              </div>
            </div>
          ) : (
            <img
              src={quizData?.[clickedQuizIndex]?.imageUrl}
              className="w-[200px h-[200px]"
            />
          )}
          {dragging && (
            <div className="drop-zone flex flex-col gap-y-[24px]">
              <div className="arrow-down-div">
                <span className="arrow-down-span">
                  <FaArrowDown size="88px" />
                </span>
              </div>
              <p className="text-[20px] font-bold">Drop your file here</p>
            </div>
          )}
        </div>
      </div>
      {quizData?.[clickedQuizIndex]?.questionType === "Quiz" && (
        <div className="grid grid-cols-2 gap-[8px]">
          <div
            className={`answer-card ${
              quizData?.[clickedQuizIndex]?.text1 ? "bg-red" : "bg-white"
            } flex gap-x-2 items-center relative`}
          >
            <div className="shape-div bg-red">
              <IoTriangleSharp className="mx-[8px]" size="32px" color="white" />
            </div>
            <input
              maxLength={75}
              value={quizData?.[clickedQuizIndex]?.text1 ?? ""}
              onChange={(e) => {
                let quizTemp = [...quizData];
                quizTemp[clickedQuizIndex].text1 = e.target.value;
                setQuizData([...quizTemp]);
              }}
              placeholder="Add answer 1"
              className={`${
                quizData?.[clickedQuizIndex]?.text1
                  ? "text-white"
                  : "text-black"
              } w-full outline-none bg-transparent border-none text-[25px] font-bold`}
            />

            {quizData?.[clickedQuizIndex]?.text1 && (
              <button
                onClick={() => {
                  let quizTemp = [...quizData];
                  quizTemp[clickedQuizIndex].answer1Clicked =
                    !quizTemp[clickedQuizIndex].answer1Clicked;
                  setQuizData([...quizTemp]);
                }}
                onMouseEnter={() => setMouseEnter1(true)}
                onMouseLeave={() => setMouseEnter1(false)}
                className={`${
                  quizData?.[clickedQuizIndex]?.answer1Clicked
                    ? "check-btn-clicked"
                    : `${
                        !quizData?.[clickedQuizIndex]?.answer1Clicked &&
                        !quizData?.[clickedQuizIndex]?.answer2Clicked &&
                        !quizData?.[clickedQuizIndex]?.answer3Clicked &&
                        !quizData?.[clickedQuizIndex]?.answer4Clicked
                          ? "check-btn-animation"
                          : ""
                      } check-btn`
                }`}
              >
                <span className={`centang-span`}>
                  {(mouseEnter1 ||
                    quizData?.[clickedQuizIndex]?.answer1Clicked) && (
                    <img src="centang.svg" className="centang-img" />
                  )}
                </span>
              </button>
            )}
            <p className="text-white absolute top-1 right-[10px]">
              {75 - quizData?.[clickedQuizIndex]?.text1?.length}
            </p>
          </div>
          <div
            className={`answer-card ${
              quizData?.[clickedQuizIndex]?.text2 ? "bg-blue" : "bg-white"
            } flex gap-x-2 items-center`}
          >
            <div className="shape-div bg-blue">
              <MdHexagon className="mx-[8px]" size="32px" color="white" />
            </div>
            <input
              maxLength={75}
              value={quizData?.[clickedQuizIndex]?.text2}
              onChange={(e) => {
                let quizTemp = [...quizData];
                quizTemp[clickedQuizIndex].text2 = e.target.value;
                setQuizData([...quizTemp]);
              }}
              placeholder="Add answer 2"
              className={`${
                quizData?.[clickedQuizIndex]?.text2
                  ? "text-white"
                  : "text-black"
              } w-full outline-none bg-transparent border-none text-[25px] font-bold`}
            />

            {quizData?.[clickedQuizIndex]?.text2 && (
              <button
                onClick={() => {
                  let quizTemp = [...quizData];
                  quizTemp[clickedQuizIndex].answer2Clicked =
                    !quizTemp[clickedQuizIndex].answer2Clicked;
                  setQuizData([...quizTemp]);
                }}
                onMouseEnter={() => setMouseEnter2(true)}
                onMouseLeave={() => setMouseEnter2(false)}
                className={`${
                  quizData?.[clickedQuizIndex]?.answer2Clicked
                    ? "check-btn-clicked"
                    : `${
                        !quizData?.[clickedQuizIndex]?.answer1Clicked &&
                        !quizData?.[clickedQuizIndex]?.answer2Clicked &&
                        !quizData?.[clickedQuizIndex]?.answer3Clicked &&
                        !quizData?.[clickedQuizIndex]?.answer4Clicked
                          ? "check-btn-animation"
                          : ""
                      } check-btn`
                }`}
              >
                <span className={`centang-span`}>
                  {(mouseEnter2 ||
                    quizData?.[clickedQuizIndex]?.answer2Clicked) && (
                    <img src="centang.svg" className="centang-img" />
                  )}
                </span>
              </button>
            )}
            <p className="text-white absolute top-1 right-[10px]">
              {75 - quizData?.[clickedQuizIndex]?.text2?.length}
            </p>
          </div>
          <div
            className={`answer-card ${
              quizData?.[clickedQuizIndex]?.text3 ? "bg-orange" : "bg-white"
            } flex gap-x-2 items-center`}
          >
            <div className="shape-div bg-orange">
              <FaCircle className="mx-[8px]" size="32px" color="white" />
            </div>
            <input
              maxLength={75}
              value={quizData?.[clickedQuizIndex]?.text3}
              onChange={(e) => {
                let quizTemp = [...quizData];
                quizTemp[clickedQuizIndex].text3 = e.target.value;
                setQuizData([...quizTemp]);
              }}
              placeholder="Add answer 3 (optional)"
              className={`${
                quizData?.[clickedQuizIndex]?.text3
                  ? "text-white"
                  : "text-black"
              } w-full outline-none bg-transparent border-none text-[25px] font-bold`}
            />

            {quizData?.[clickedQuizIndex]?.text3 && (
              <button
                onClick={() => {
                  let quizTemp = [...quizData];
                  quizTemp[clickedQuizIndex].answer3Clicked =
                    !quizTemp[clickedQuizIndex].answer3Clicked;
                  setQuizData([...quizTemp]);
                }}
                onMouseEnter={() => setMouseEnter3(true)}
                onMouseLeave={() => setMouseEnter3(false)}
                className={`${
                  quizData?.[clickedQuizIndex]?.answer3Clicked
                    ? "check-btn-clicked"
                    : `${
                        !quizData?.[clickedQuizIndex]?.answer1Clicked &&
                        !quizData?.[clickedQuizIndex]?.answer2Clicked &&
                        !quizData?.[clickedQuizIndex]?.answer3Clicked &&
                        !quizData?.[clickedQuizIndex]?.answer4Clicked
                          ? "check-btn-animation"
                          : ""
                      } check-btn`
                }`}
              >
                <span className={`centang-span`}>
                  {(mouseEnter3 ||
                    quizData?.[clickedQuizIndex]?.answer3Clicked) && (
                    <img src="centang.svg" className="centang-img" />
                  )}
                </span>
              </button>
            )}
            <p className="text-white absolute top-1 right-[10px]">
              {75 - quizData?.[clickedQuizIndex]?.text3?.length}
            </p>
          </div>
          <div
            className={`answer-card ${
              quizData?.[clickedQuizIndex]?.text4 ? "bg-dark-green" : "bg-white"
            } flex gap-x-2 items-center relative`}
          >
            <div className="shape-div bg-dark-green">
              <FaSquareFull className="mx-[8px]" size="32px" color="white" />
            </div>
            <input
              maxLength={75}
              value={quizData?.[clickedQuizIndex]?.text4}
              onChange={(e) => {
                let quizTemp = [...quizData];
                quizTemp[clickedQuizIndex].text4 = e.target.value;
                setQuizData([...quizTemp]);
              }}
              placeholder="Add answer 4 (optional)"
              className={`${
                quizData?.[clickedQuizIndex]?.text4
                  ? "text-white"
                  : "text-black"
              } w-full outline-none bg-transparent border-none text-[25px] font-bold`}
            />

            {quizData?.[clickedQuizIndex]?.text4 && (
              <button
                onClick={() => {
                  let quizTemp = [...quizData];
                  quizTemp[clickedQuizIndex].answer4Clicked =
                    !quizTemp[clickedQuizIndex].answer4Clicked;
                  setQuizData([...quizTemp]);
                }}
                onMouseEnter={() => setMouseEnter4(true)}
                onMouseLeave={() => setMouseEnter4(false)}
                className={`${
                  quizData?.[clickedQuizIndex]?.answer4Clicked
                    ? "check-btn-clicked"
                    : `${
                        !quizData?.[clickedQuizIndex]?.answer1Clicked &&
                        !quizData?.[clickedQuizIndex]?.answer2Clicked &&
                        !quizData?.[clickedQuizIndex]?.answer3Clicked &&
                        !quizData?.[clickedQuizIndex]?.answer4Clicked
                          ? "check-btn-animation"
                          : ""
                      } check-btn`
                }`}
              >
                <span className={`centang-span`}>
                  {(mouseEnter4 ||
                    quizData?.[clickedQuizIndex]?.answer4Clicked) && (
                    <img src="centang.svg" className="centang-img" />
                  )}
                </span>
              </button>
            )}
            <p className="text-white absolute top-1 right-[10px]">
              {75 - quizData?.[clickedQuizIndex]?.text4?.length}
            </p>
          </div>
        </div>
      )}
      {quizData?.[clickedQuizIndex]?.questionType === "True or false" && (
        <div className="grid grid-cols-2 gap-[8px]">
          <div
            className={`answer-card bg-red flex gap-x-2 items-center relative`}
          >
            <div className="shape-div bg-red">
              <IoTriangleSharp className="mx-[8px]" size="32px" color="white" />
            </div>
            <p className="text-white w-full outline-none bg-transparent border-none text-[36px] font-bold">
              True
            </p>

            <button
              onClick={() => {
                let quizTemp = [...quizData];
                if (quizTemp[clickedQuizIndex].trueOrFalseAnswer === "true") {
                  quizTemp[clickedQuizIndex].trueOrFalseAnswer = "false";
                } else {
                  quizTemp[clickedQuizIndex].trueOrFalseAnswer = "true";
                }
                setQuizData([...quizTemp]);
              }}
              onMouseEnter={() => setMouseEnter1(true)}
              onMouseLeave={() => setMouseEnter1(false)}
              className={`${
                quizData[clickedQuizIndex]?.trueOrFalseAnswer === "true"
                  ? "check-btn-clicked"
                  : `${
                      !quizData[clickedQuizIndex]?.trueOrFalseAnswer
                        ? "check-btn-animation"
                        : ""
                    } check-btn`
              }`}
            >
              <span className={`centang-span`}>
                {(mouseEnter1 ||
                  quizData[clickedQuizIndex].trueOrFalseAnswer === "true") && (
                  <img src="centang.svg" className="centang-img" />
                )}
              </span>
            </button>
          </div>
          <div className={`answer-card bg-blue flex gap-x-2 items-center`}>
            <div className="shape-div bg-blue">
              <MdHexagon className="mx-[8px]" size="32px" color="white" />
            </div>
            <p className="text-white w-full outline-none bg-transparent border-none text-[36px] font-bold">
              False
            </p>
            <button
              onClick={() => {
                let quizTemp = [...quizData];
                if (quizTemp[clickedQuizIndex].trueOrFalseAnswer === "false") {
                  quizTemp[clickedQuizIndex].trueOrFalseAnswer = "true";
                } else {
                  quizTemp[clickedQuizIndex].trueOrFalseAnswer = "false";
                }
                setQuizData([...quizTemp]);
              }}
              onMouseEnter={() => setMouseEnter2(true)}
              onMouseLeave={() => setMouseEnter2(false)}
              className={`${
                quizData[clickedQuizIndex].trueOrFalseAnswer === "false"
                  ? "check-btn-clicked"
                  : `${
                      !quizData[clickedQuizIndex].trueOrFalseAnswer
                        ? "check-btn-animation"
                        : ""
                    } check-btn`
              }`}
            >
              <span className={`centang-span`}>
                {(mouseEnter2 ||
                  quizData[clickedQuizIndex].trueOrFalseAnswer === "false") && (
                  <img src="centang.svg" className="centang-img" />
                )}
              </span>
            </button>
          </div>
        </div>
      )}
      {quizData?.[clickedQuizIndex]?.questionType === "Type answer" && (
        <div className="flex justify-center flex-col gap-y-2 items-center w-full">
          <div className="question-div">
            <div
              className={`question-inner-div-answer ${
                quizData[clickedQuizIndex]?.text1?.length > 0 && "bg-red"
              }`}
            >
              <div className="question-sub-inner-div">
                <div className="question-1-div-answer">
                  <div className="question-2-div">
                    <input
                      maxLength={20}
                      value={quizData?.[clickedQuizIndex]?.text1 ?? ""}
                      onChange={(e) => {
                        let quizTemp = [...quizData];
                        quizTemp[clickedQuizIndex].text1 = e.target.value;
                        setQuizData([...quizTemp]);
                      }}
                      placeholder="Type an answer"
                      className={`${
                        quizData?.[clickedQuizIndex]?.text1?.length > 0
                          ? "text-white"
                          : "text-black"
                      } w-full text-center question-p bg-transparent text-[25px] font-bold border-transparent outline-none`}
                      type="text"
                    />
                    <p className="absolute top-[25%] text-white right-1 text-[14px] font-semibold">
                      {20 - quizData?.[clickedQuizIndex]?.text1?.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              if (quizData?.[clickedQuizIndex]?.additionalAnswers > 0) return;
              let quizTemp = [...quizData];
              quizTemp[clickedQuizIndex].additionalAnswers =
                quizTemp[clickedQuizIndex].additionalAnswers + 1;
              setQuizData([...quizTemp]);
            }}
            className="shadow-overlay-button"
          >
            {(quizData?.[clickedQuizIndex]?.additionalAnswers ?? 0) <= 0
              ? "Add other accepted answers"
              : `Other accepted answers ${
                  quizData?.[clickedQuizIndex]?.additionalAnswers < 3 ? "(" : ""
                }${
                  quizData?.[clickedQuizIndex]?.additionalAnswers < 3
                    ? 3 - quizData?.[clickedQuizIndex]?.additionalAnswers
                    : ""
                }${
                  quizData?.[clickedQuizIndex]?.additionalAnswers < 3 ? ")" : ""
                }`}
          </button>
          {quizData?.[clickedQuizIndex]?.additionalAnswers > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {quizData?.[clickedQuizIndex]?.additionalAnswers > 0 && (
                <div className="question-div">
                  <div
                    className={`question-answer-full ${
                      quizData?.[clickedQuizIndex]?.text2?.length > 0 &&
                      "bg-blue"
                    }`}
                  >
                    <div className="question-sub-inner-div">
                      <div className="question-1-div-answer">
                        <div className="question-2-div">
                          <input
                            maxLength={20}
                            value={quizData?.[clickedQuizIndex]?.text2}
                            onChange={(e) => {
                              let quizTemp = [...quizData];
                              quizTemp[clickedQuizIndex].text2 = e.target.value;
                              setQuizData([...quizTemp]);
                            }}
                            placeholder="Type an answer"
                            className={`${
                              quizData?.[clickedQuizIndex]?.text2?.length > 0
                                ? "text-white"
                                : "text-black"
                            } w-full text-center question-p text-[25px] font-bold  bg-transparent border-transparent outline-none`}
                            type="text"
                          />
                          <p className="absolute top-[25%] text-white right-1 text-[14px] font-semibold">
                            {20 - quizData?.[clickedQuizIndex]?.text2?.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {quizData?.[clickedQuizIndex]?.additionalAnswers > 1 && (
                <div className="question-div">
                  <div
                    className={`question-answer-full ${
                      quizData?.[clickedQuizIndex]?.text3?.length > 0 &&
                      "bg-orange"
                    }`}
                  >
                    <div className="question-sub-inner-div">
                      <div className="question-1-div-answer">
                        <div className="question-2-div">
                          <input
                            maxLength={20}
                            value={quizData?.[clickedQuizIndex]?.text3}
                            onChange={(e) => {
                              let quizTemp = [...quizData];
                              quizTemp[clickedQuizIndex].text3 = e.target.value;
                              setQuizData([...quizTemp]);
                            }}
                            placeholder="Type an answer"
                            className={`${
                              quizData?.[clickedQuizIndex]?.text3?.length > 0
                                ? "text-white"
                                : "text-black"
                            } w-full text-center question-p text-[25px] font-bold  bg-transparent border-transparent outline-none`}
                            type="text"
                          />
                          <p className="absolute top-[25%] text-white right-1 text-[14px] font-semibold">
                            {20 - quizData?.[clickedQuizIndex]?.text3?.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {quizData?.[clickedQuizIndex]?.additionalAnswers > 2 && (
                <div className="question-div">
                  <div
                    className={`question-answer-full ${
                      quizData?.[clickedQuizIndex]?.text4?.length > 0 &&
                      "bg-green-only"
                    }`}
                  >
                    <div className="question-sub-inner-div">
                      <div className="question-1-div-answer">
                        <div className="question-2-div">
                          <input
                            maxLength={20}
                            value={quizData?.[clickedQuizIndex]?.text4}
                            onChange={(e) => {
                              let quizTemp = [...quizData];
                              quizTemp[clickedQuizIndex].text4 = e.target.value;
                              setQuizData([...quizTemp]);
                            }}
                            placeholder="Type an answer"
                            className={`${
                              quizData?.[clickedQuizIndex]?.text4?.length > 0
                                ? "text-white"
                                : "text-black"
                            } w-full text-center question-p text-[25px] font-bold  bg-transparent border-transparent outline-none`}
                            type="text"
                          />
                          <p className="absolute top-[25%] text-white right-1 text-[14px] font-semibold">
                            {20 - quizData?.[clickedQuizIndex]?.text4?.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {quizData?.[clickedQuizIndex]?.additionalAnswers > 0 &&
                quizData?.[clickedQuizIndex]?.additionalAnswers < 3 && (
                  <button
                    onClick={() => {
                      let quizTemp = [...quizData];
                      quizTemp[clickedQuizIndex].additionalAnswers =
                        quizTemp[clickedQuizIndex].additionalAnswers + 1;
                      setQuizData([...quizTemp]);
                    }}
                    className="shadow-overlay-button"
                  >
                    Add more
                  </button>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};