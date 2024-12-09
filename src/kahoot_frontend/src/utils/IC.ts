import { AuthClient, AuthClientLoginOptions } from "@dfinity/auth-client";
import * as idlActor from "../../../declarations/kahoot_backend/index";
import { ActorSubclass } from "@dfinity/agent";
import { _SERVICE } from "../../../declarations/kahoot_backend/kahoot_backend.did";

class IC {
  private static authClient: AuthClient;
  private static backend: ActorSubclass<_SERVICE>;

  private static async initAuthClient() {
    if (!this.authClient) {
      this.authClient = await AuthClient.create();
    }
  }

  private static async initBackend() {
    if (!this.backend) {
      this.backend = idlActor.createActor(idlActor.canisterId, {
        agentOptions: {
          identity: this.authClient?.getIdentity() ?? undefined,
        },
      });
    }
  }

  public static async getAuth(
    run?: (self: AuthClient) => any
  ): Promise<AuthClient> {
    if (!this.authClient) {
      await this.initAuthClient();
    }

    run && (await run(this.authClient));
    return this.authClient as AuthClient;
  }

  public static async logout() {
    return await this.authClient.logout();
  }

  public static async getBackend(
    run?: (self: ActorSubclass<_SERVICE>) => any
  ): Promise<ActorSubclass<_SERVICE>> {
    if (!this.backend) {
      await this.initBackend();
    }

    run && (await run(this.backend));
    return this.backend as ActorSubclass<_SERVICE>;
  }

  public static defaultAuthOption: AuthClientLoginOptions = {
    identityProvider: `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`,
    windowOpenerFeatures:
      "toolbar=0,location=0,menubar=0,width=500,height=500,left=100,top=100",
    maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
    onSuccess: () => {
      console.log("login successful");
    },
    onError: (err: any) => {
      console.error("login failed", err);
    },
  };
}

export default IC;