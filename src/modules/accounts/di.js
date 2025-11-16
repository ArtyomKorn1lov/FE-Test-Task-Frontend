import {InversionControl} from "@/core";
import {AccountRepository} from "@/modules/accounts/repositories";
import {
  CreateAccount,
  DeleteAccount,
  GetAccountById,
  GetAccounts,
  GetFilterValues,
  GetPageNav,
  GetRoles,
  SearchAccounts,
  UpdateAccount
} from "@/modules/accounts/use-case";

InversionControl.register("AccountRepository", AccountRepository, ["ApiClient"]);

InversionControl.register("CreateAccount", CreateAccount, ["AccountRepository"]);
InversionControl.register("DeleteAccount", DeleteAccount, ["AccountRepository"]);
InversionControl.register("GetAccountById", GetAccountById, ["AccountRepository"]);
InversionControl.register("GetAccounts", GetAccounts, ["AccountRepository"]);
InversionControl.register("GetFilterValues", GetFilterValues, ["AccountRepository"]);
InversionControl.register("GetPageNav", GetPageNav, ["AccountRepository"]);
InversionControl.register("GetRoles", GetRoles, ["AccountRepository"]);
InversionControl.register("SearchAccounts", SearchAccounts, ["AccountRepository"]);
InversionControl.register("UpdateAccount", UpdateAccount, ["AccountRepository"]);
