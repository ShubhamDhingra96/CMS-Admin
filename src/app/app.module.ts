import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgModule, ErrorHandler } from '@angular/core';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PasswordModule } from 'primeng/password';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';
import { GlobalErrorHandler } from './global-error-handler';
import { ServerErrorInterceptor } from './server-error.interceptor';
import { DialogService } from 'primeng/api';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component'; import { ArchwizardModule } from 'angular-archwizard';
import { AddRegisterComponent } from './components/register/add-register/add-register.component';
import { AddBinsetupComponent } from './components/bin-setup/add-binsetup/add-binsetup.component';
import { ViewBinsetupComponent } from './components/bin-setup/view-binsetup/view-binsetup.component';
import { AddBingroupSetupComponent } from './components/bingroup-setup/add-bingroup-setup/add-bingroup-setup.component';
import { ViewBingroupSetupComponent } from './components/bingroup-setup/view-bingroup-setup/view-bingroup-setup.component';
import { ViewBingroupSetupConfirmComponent } from './components/bingroup-setup/view-bingroup-setup-confirm/view-bingroup-setup-confirm.component';
import { AddPlasticProductSetupComponent } from './components/plastic-product-setup/add-plastic-product-setup/add-plastic-product-setup.component';
import { PlasticDetailConfirmationComponent } from './components/plastic-product-setup/plastic-detail-confirmation/plastic-detail-confirmation.component';
import { AddProgramDefinitionComponent } from './components/program-definition/add-program-definition/add-program-definition.component';
import { ProgramDefinitionConfirmationComponent } from './components/program-definition/program-definition-confirmation/program-definition-confirmation.component';
import { ViewProgramDefinitionComponent } from './components/program-definition/view-program-definition/view-program-definition.component';
//import { AddProgramTypeDefinitionComponent } from './components/product-type-definition/add-program-type-definition/add-program-type-definition.component';
//import { ViewProgramTypeDefinitionComponent } from './components/product-type-definition/view-program-type-definition/view-program-type-definition.component';
import { ViewProductTypeDefinitionComponent } from './components/product-type-definition/view-product-type-definition/view-product-type-definition.component';
import { AddProductTypeDefinitionComponent } from './components/product-type-definition/add-product-type-definition/add-product-type-definition.component';
import { AddAssignProductComponent } from './components/assign-products/add-assign-product/add-assign-product.component';
import { ViewAssignProductComponent } from './components/assign-products/view-assign-product/view-assign-product.component';
import { UserRegistrationComponent } from './components/register/user-registration/user-registration.component';
import { AssignEntityRightComponent } from './components/assign-entity-rights/assign-entity-right/assign-entity-right.component';
import { ViewAssignEntityRightComponent } from './components/assign-entity-rights/view-assign-entity-right/view-assign-entity-right.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { BlockUserComponent } from './components/block-user/block-user.component';
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
import { UserstatusComponent } from './components/register/userstatus/userstatus.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SuccessMessageComponent } from './components/success-message/success-message.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DataService } from './DataService';
import { DashboardMenuComponent } from './components/dashboard-menu/dashboard-menu.component';
import { OnCreateDirective } from './on-create.directive';
//import { ViewBingroupSetupConfirmComponent } from './components/bingroup-setup/view-bingroup-setup-confirm/view-bingroup-setup-confirm.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FeesDefaultSettingsComponent } from './components/fees-management/fees-default-settings/fees-default-settings.component';
import { FeesSpecificSettingsComponent } from './components/fees-management/fees-specific-settings/fees-specific-settings.component';
import { ViewFeesDefaultSettingsComponent } from './components/fees-management/view-fees-default-settings/view-fees-default-settings.component';
import { ViewFeesSpecificSettingsComponent } from './components/fees-management/view-fees-specific-settings/view-fees-specific-settings.component';
import { DefaultSettingsComponent } from './components/limit-management/default-settings/default-settings.component';
import { SpecificSettingComponent } from './components/limit-management/specific-setting/specific-setting.component';
import { CorporateEntityComponent } from './components/organization/corporate-entity/corporate-entity.component';
import { CorporateUserComponent } from './components/organization/corporate-user/corporate-user.component';
import { ModifyBingroupSetupComponent } from './components/bingroup-setup/modify-bingroup-setup/modify-bingroup-setup.component';
import { OnLoadTrDirective } from './on-load-tr.directive';
import { CustomerRegistrationComponent } from './components/register/customer-registration/customer-registration.component';
import { ViewCustomerRegistrationComponent } from './components/register/view-customer-registration/view-customer-registration.component';
import { ProductSettingsComponent } from './components/product-settings/product-settings.component';
import { AddTransactionGroupingComponent } from './components/transaction-grouping/add-transaction-grouping/add-transaction-grouping.component';
import { ViewTransactionGroupingComponent } from './components/transaction-grouping/view-transaction-grouping/view-transaction-grouping.component';
import { ViewUsageSettingsComponent } from './components/view-usage-settings/view-usage-settings.component';
import { ProductSummaryComponent } from './components/product-summary/product-summary.component';
import { AddAuthOrderSettingComponent } from './components/auth-order-setting/add-auth-order-setting/add-auth-order-setting.component';
import { ViewAuthOrderSettingComponent } from './components/auth-order-setting/view-auth-order-setting/view-auth-order-setting.component';
import { AlertSettingsComponent } from './components/alert-settings/alert-settings.component';
import { PendingconfigurationComponent } from './components/pendingconfiguration/pendingconfiguration.component';
import { CallcenterComponent } from './components/callcenter/callcenter.component';

@NgModule({
 
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ErrorMessageComponent,
    ForgetPasswordComponent,
    AddRegisterComponent,
    ResetpasswordComponent,
    UserstatusComponent,
    ResetPasswordComponent,
    SuccessMessageComponent,
    AddBinsetupComponent,
    ViewBinsetupComponent,
    AddBingroupSetupComponent,
    ViewBingroupSetupComponent,
    ViewBingroupSetupConfirmComponent,
    AddPlasticProductSetupComponent,
    PlasticDetailConfirmationComponent,
    AddProgramDefinitionComponent,
    ProgramDefinitionConfirmationComponent,
    ViewProgramDefinitionComponent,
    SidebarComponent,
    ViewProductTypeDefinitionComponent,
    AddProductTypeDefinitionComponent,
    AddAssignProductComponent,
    ViewAssignProductComponent,
    UserRegistrationComponent,
    AssignEntityRightComponent,
    ViewAssignEntityRightComponent,
    ChangePasswordComponent,
    BlockUserComponent,
    CountryGroupComponent,
    ViewCountryGroupComponent,
    DeliveryChannelGroupComponent,
    ViewDeliveryChannelGroupComponent,
    AcquiringNetworkComponent,
    ViewAcquiringNetworkComponent,
    CardUsageGroupComponent,
    ViewCardUsageGroupComponent,
    MerchantCategoryComponent,
    ViewMerchantCategoryComponent,

    AppComponent,
    LoginComponent,
    DashboardComponent,
    ErrorMessageComponent,
    ForgetPasswordComponent,
    AddRegisterComponent,
    AddBinsetupComponent,
    ViewBinsetupComponent,
    AddBingroupSetupComponent,
    ViewBingroupSetupComponent,
    ViewBingroupSetupConfirmComponent,
    AddPlasticProductSetupComponent,
    PlasticDetailConfirmationComponent,
    AddProgramDefinitionComponent,
    ProgramDefinitionConfirmationComponent,
    ViewProgramDefinitionComponent,
    SidebarComponent,
    DashboardMenuComponent,
    OnCreateDirective,
    ViewProductTypeDefinitionComponent,
    AddProductTypeDefinitionComponent,
    AddAssignProductComponent,
    UserRegistrationComponent,
    AssignEntityRightComponent,
    ViewAssignEntityRightComponent,
    ChangePasswordComponent,
    BlockUserComponent,
    CountryGroupComponent,
    ViewCountryGroupComponent,
    DeliveryChannelGroupComponent,
    ViewDeliveryChannelGroupComponent,
    AcquiringNetworkComponent,
    ViewAcquiringNetworkComponent,
    CardUsageGroupComponent,
    ViewCardUsageGroupComponent,
    MerchantCategoryComponent,
    ViewMerchantCategoryComponent,
    OnCreateDirective,
    FeesDefaultSettingsComponent,
    FeesSpecificSettingsComponent,
    ViewFeesDefaultSettingsComponent,
    ViewFeesSpecificSettingsComponent,
    DefaultSettingsComponent,
    SpecificSettingComponent,
    CorporateEntityComponent,
    CorporateUserComponent,
    ModifyBingroupSetupComponent,
    OnLoadTrDirective,
    CustomerRegistrationComponent,
    ViewCustomerRegistrationComponent,
    ProductSettingsComponent,
    AddTransactionGroupingComponent,
    ViewTransactionGroupingComponent,
    ViewUsageSettingsComponent,
    ProductSummaryComponent,
    AddAuthOrderSettingComponent,
    ViewAuthOrderSettingComponent,
    AlertSettingsComponent,
    PendingconfigurationComponent,
    CallcenterComponent,
    
  ],
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ScrollPanelModule,
    PasswordModule,
    BrowserAnimationsModule,
    KeyFilterModule,
    DialogModule,
    ArchwizardModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    DynamicDialogModule,
    DialogModule,
    OverlayPanelModule,
    CarouselModule.forRoot()
  ],
  entryComponents: [ErrorMessageComponent, SuccessMessageComponent],
  providers: [DialogService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
