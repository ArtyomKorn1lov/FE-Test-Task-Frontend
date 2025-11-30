import {DependencyInjection} from "@/core";
import {AccountRepository} from "@/modules/accounts/repositories";
import {
  CreateAccount,
  DeleteAccount,
  DeleteAccounts,
  GetAccountById,
  GetAccounts,
  GetFilterValues,
  GetPageNav,
  GetRoles,
  SearchAccounts,
  UpdateAccount
} from "@/modules/accounts/use-case";

DependencyInjection.register("AccountRepository", AccountRepository, ["ApiClient"]);

DependencyInjection.register("CreateAccount", CreateAccount, ["AccountRepository"]);
DependencyInjection.register("DeleteAccount", DeleteAccount, ["AccountRepository"]);
DependencyInjection.register("DeleteAccounts", DeleteAccounts, ["AccountRepository"]);
DependencyInjection.register("GetAccountById", GetAccountById, ["AccountRepository"]);
DependencyInjection.register("GetAccounts", GetAccounts, ["AccountRepository"]);
DependencyInjection.register("GetFilterValues", GetFilterValues, ["AccountRepository"]);
DependencyInjection.register("GetPageNav", GetPageNav, ["AccountRepository"]);
DependencyInjection.register("GetRoles", GetRoles, ["AccountRepository"]);
DependencyInjection.register("SearchAccounts", SearchAccounts, ["AccountRepository"]);
DependencyInjection.register("UpdateAccount", UpdateAccount, ["AccountRepository"]);
