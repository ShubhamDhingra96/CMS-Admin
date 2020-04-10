import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
//import { RegistrationCompanyComponent } from './components/registration-company/registration-company.component';
import { AddRegisterComponent } from './components/register/add-register/add-register.component';
import { AddBinsetupComponent } from './components/bin-setup/add-binsetup/add-binsetup.component';
import { ViewBinsetupComponent } from './components/bin-setup/view-binsetup/view-binsetup.component';
import { AddBingroupSetupComponent } from './components/bingroup-setup/add-bingroup-setup/add-bingroup-setup.component';
import { ViewBingroupSetupComponent } from './components/bingroup-setup/view-bingroup-setup/view-bingroup-setup.component';
import { AddPlasticProductSetupComponent } from './components/plastic-product-setup/add-plastic-product-setup/add-plastic-product-setup.component';
import { PlasticDetailConfirmationComponent } from './components/plastic-product-setup/plastic-detail-confirmation/plastic-detail-confirmation.component';
import { AddProgramDefinitionComponent } from './components/program-definition/add-program-definition/add-program-definition.component';
import { ProgramDefinitionConfirmationComponent } from './components/program-definition/program-definition-confirmation/program-definition-confirmation.component';
import { ViewProgramDefinitionComponent } from './components/program-definition/view-program-definition/view-program-definition.component';
import { AddProductTypeDefinitionComponent } from './components/product-type-definition/add-product-type-definition/add-product-type-definition.component';
import { ViewProductTypeDefinitionComponent } from './components/product-type-definition/view-product-type-definition/view-product-type-definition.component';
import { AddAssignProductComponent } from './components/assign-products/add-assign-product/add-assign-product.component';
import { ViewAssignProductComponent } from './components/assign-products/view-assign-product/view-assign-product.component';
import { UserRegistrationComponent } from './components/register/user-registration/user-registration.component';
import { AssignEntityRightComponent } from './components/assign-entity-rights/assign-entity-right/assign-entity-right.component';
import { ViewAssignEntityRightComponent } from './components/assign-entity-rights/view-assign-entity-right/view-assign-entity-right.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { BlockUserComponent } from './components/block-user/block-user.component';
import { ViewBingroupSetupConfirmComponent } from './components/bingroup-setup/view-bingroup-setup-confirm/view-bingroup-setup-confirm.component';
import { CountryGroupComponent } from './components/usage-setting/country-group/country-group.component';
import { ViewCountryGroupComponent } from './components/usage-setting/view-country-group/view-country-group.component';
import { DeliveryChannelGroupComponent } from './components/usage-setting/delivery-channel-group/delivery-channel-group.component';
import { ViewDeliveryChannelGroupComponent } from './components/usage-setting/view-delivery-channel-group/view-delivery-channel-group.component';
import { AcquiringNetworkComponent } from './components/usage-setting/acquiring-network/acquiring-network.component';
import { ViewAcquiringNetworkComponent } from './components/usage-setting/view-acquiring-network/view-acquiring-network.component';
import { CardUsageGroupComponent } from './components/usage-setting/card-usage-group/card-usage-group.component';
import { ViewCardUsageGroupComponent } from './components/usage-setting/view-card-usage-group/view-card-usage-group.component';
import { MerchantCategoryComponent } from './components/usage-setting/merchant-category/merchant-category.component';
import { ViewMerchantCategoryComponent } from './components/usage-setting/view-merchant-category/view-merchant-category.component';
import { ResetpasswordComponent } from './components/register/resetpassword/resetpassword.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DefaultSettingsComponent } from './components/limit-management/default-settings/default-settings.component';
import { SpecificSettingComponent } from './components/limit-management/specific-setting/specific-setting.component';
import { FeesDefaultSettingsComponent } from './components/fees-management/fees-default-settings/fees-default-settings.component';
import { FeesSpecificSettingsComponent } from './components/fees-management/fees-specific-settings/fees-specific-settings.component';
import { ViewFeesDefaultSettingsComponent } from './components/fees-management/view-fees-default-settings/view-fees-default-settings.component';
import { ViewFeesSpecificSettingsComponent } from './components/fees-management/view-fees-specific-settings/view-fees-specific-settings.component';
import { CorporateEntityComponent } from './components/organization/corporate-entity/corporate-entity.component';
import { CorporateUserComponent } from './components/organization/corporate-user/corporate-user.component';
import { ModifyBingroupSetupComponent } from './components/bingroup-setup/modify-bingroup-setup/modify-bingroup-setup.component';
import { CustomerRegistrationComponent} from './components/register/customer-registration/customer-registration.component';
import { ViewCustomerRegistrationComponent} from './components/register/view-customer-registration/view-customer-registration.component';
import { ProductSettingsComponent} from './components/product-settings/product-settings.component';
import { AddTransactionGroupingComponent} from './components/transaction-grouping/add-transaction-grouping/add-transaction-grouping.component';
import { ViewTransactionGroupingComponent } from './components/transaction-grouping/view-transaction-grouping/view-transaction-grouping.component';
import { ViewUsageSettingsComponent}from './components/view-usage-settings/view-usage-settings.component';
import { ProductSummaryComponent} from './components/product-summary/product-summary.component';
import { AddAuthOrderSettingComponent} from './components/auth-order-setting/add-auth-order-setting/add-auth-order-setting.component' ;
import { ViewAuthOrderSettingComponent } from './components/auth-order-setting/view-auth-order-setting/view-auth-order-setting.component';
import { AlertSettingsComponent} from './components/alert-settings/alert-settings.component';
import { PendingconfigurationComponent} from './components/pendingconfiguration/pendingconfiguration.component';
import { CallcenterComponent} from './components/callcenter/callcenter.component';

const routes: Routes =
  [{ path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, children: []},
  { path: 'dashboard/user-registration', component: UserRegistrationComponent },
  { path: 'dashboard/add-register', component: AddRegisterComponent },
  { path: 'dashboard/user/forgot-password', component: ForgetPasswordComponent },
  { path: 'dashboard/change-password', component: ChangePasswordComponent },
  { path: 'dashboard/block-user', component: BlockUserComponent },
  { path: 'dashboard/reset-password', component: ResetpasswordComponent },
  { path: 'dashboard/add-binsetup', component: AddBinsetupComponent },
  { path: 'dashboard/view-binsetup', component: ViewBinsetupComponent },
  { path: 'dashboard/add-bingroup-setup', component: AddBingroupSetupComponent },
  { path: 'dashboard/view-bingroup-setup', component: ViewBingroupSetupComponent },
  { path: 'dashboard/add-plastic-product-setup', component: AddPlasticProductSetupComponent },
  { path: 'dashboard/plastic-detail-confirmation', component: PlasticDetailConfirmationComponent },
  { path: 'dashboard/userstatus', component: BlockUserComponent },
  { path: 'dashboard/add-binsetup', component: AddBinsetupComponent },
  { path: 'dashboard/view-binsetup', component: ViewBinsetupComponent },
  { path: 'dashboard/add-bingroup-setup', component: AddBingroupSetupComponent },
  { path: 'dashboard/view-bingroup-setup', component: ViewBingroupSetupComponent },
  { path: 'dashboard/view-bingroup-setup-confirm', component: ViewBingroupSetupConfirmComponent },
  { path: 'dashboard/add-plastic-product-setup', component: AddPlasticProductSetupComponent },
  { path: 'dashboard/plastic-detail-confirmation', component: PlasticDetailConfirmationComponent },
  { path: 'dashboard/add-program-definition', component: AddProgramDefinitionComponent },
  { path: 'dashboard/program-definition-confirmation', component: ProgramDefinitionConfirmationComponent },
  { path: 'dashboard/view-program-definition', component: ViewProgramDefinitionComponent },
  { path: 'dashboard/add-product-type-definition', component: AddProductTypeDefinitionComponent },
  { path: 'dashboard/view-product-type-definition', component: ViewProductTypeDefinitionComponent },
  { path: 'dashboard/add-assign-product', component: AddAssignProductComponent },
  { path: 'dashboard/view-assign-product', component: ViewAssignProductComponent },
  { path: 'dashboard/assign-entity-right', component: AssignEntityRightComponent },
  { path: 'dashboard/view-assign-entity-right', component: ViewAssignEntityRightComponent },
  { path: 'dashboard/country-group', component: CountryGroupComponent },
  { path: 'dashboard/view-country-group', component: ViewCountryGroupComponent },
  { path: 'dashboard/delivery-channel-group', component: DeliveryChannelGroupComponent },
  { path: 'dashboard/view-delivery-channel-group', component: ViewDeliveryChannelGroupComponent },
  { path: 'dashboard/acquiring-network', component: AcquiringNetworkComponent },
  { path: 'dashboard/view-acquiring-network', component: ViewAcquiringNetworkComponent },
  { path: 'dashboard/card-usage-group', component: CardUsageGroupComponent },
  { path: 'dashboard/view-card-usage-group', component: ViewCardUsageGroupComponent },
  { path: 'dashboard/merchant-category', component: MerchantCategoryComponent },
  { path: 'dashboard/view-merchant-category', component: ViewMerchantCategoryComponent },
  { path: 'dashboard/logout', component: LoginComponent, redirectTo: '' },
  { path: 'forget', component: ResetPasswordComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'dashboard/fees-default-settings',component:FeesDefaultSettingsComponent},
  { path:'dashboard/view-fees-default-settings', component:ViewFeesDefaultSettingsComponent},
  { path: 'dashboard/fees-specific-settings', component: FeesSpecificSettingsComponent },
  { path: 'dashboard/view-fees-specific-settings', component:ViewFeesSpecificSettingsComponent},
  { path: 'dashboard/limit-management-default', component: DefaultSettingsComponent},
  { path: 'dashboard/limit-management-specific', component: SpecificSettingComponent},
  { path: 'dashboard/corporate-entity', component:CorporateEntityComponent},
  { path: 'dashboard/corporate-user', component:CorporateUserComponent},
  { path: 'dashboard/modify-bin-group', component:ModifyBingroupSetupComponent},
  { path:'dashboard/customer-registration', component: CustomerRegistrationComponent},
  { path: 'dashboard/view-customer-registration', component: ViewCustomerRegistrationComponent },
  { path: 'dashboard/product-setting', component: ProductSettingsComponent},
  { path:'dashboard/add-transaction-grouping', component:AddTransactionGroupingComponent},
  { path: 'dashboard/view-transaction-grouping', component: ViewTransactionGroupingComponent }, 
  { path:'dashboard/view-usage-settings', component:ViewUsageSettingsComponent},
  { path:'dashboard/product-summary', component:ProductSummaryComponent},
  { path:'dashboard/add-auth-order-setting',component:AddAuthOrderSettingComponent},
  { path:'dashboard/view-auth-order-setting', component: ViewAuthOrderSettingComponent },
  { path:'dashboard/alert-settings', component:AlertSettingsComponent},
  { path:'dashboard/pendingconfiguration', component:PendingconfigurationComponent},
    { path:'dashboard/callcenter',component:CallcenterComponent},
  
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
