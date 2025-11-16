import {InversionControl} from "@/core/di";
import {ApiClient} from "@/core/api-client";

InversionControl.register("ApiClient", ApiClient, [process.env.REST_API_URL ?? "/"]);
