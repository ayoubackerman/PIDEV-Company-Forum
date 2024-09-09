import { APP_INITIALIZER, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './componement/navbar/navbar.component';
import { FooterComponent } from './componement/footer/footer/footer.component';
import { CardComponent } from './componement/Card/card/card.component';
import { CompanyCardComponent } from './componement/CompanyCard/company-card/company-card.component';
import { ContactComponent } from './componement/Contact/contact/contact.component';
import { Error404Component } from './componement/error404/error404/error404.component';
import { HomeComponent } from './componement/home/home/home.component';
import { InfoForumComponent } from './componement/Info/info-forum/info-forum.component';
import { FrontOfficeComponent } from './componement/front-office/front-office/front-office.component';
import { Home2Component } from './componement/home2/home2/home2.component';
import { SliderComponent } from './componement/Slider/slider/slider.component';
import { ForumComponent } from './componement/form/forum/forum.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { UserInfoComponent } from './componement/user-info/user-info.component';
import { AdminKeycloakComponent } from './componement/admin-keycloak/admin-keycloak.component';
import { RoleSelectionComponent } from './componement/role-selection/role-selection.component';
import { StudentInfoPageComponent } from './componement/student-info-page/student-info-page.component';
import { TeacherInfoPageComponent } from './componement/teacher-info-page/teacher-info-page.component';
import { CompanyInfoPageComponent } from './componement/company-info-page/company-info-page.component';
import { AlumniInfoPageComponent } from './componement/alumni-info-page/alumni-info-page.component';
import { UserInfoModalComponent } from './componement/user-info-modal/user-info-modal.component';
import { UserUpdateComponent } from './componement/user-update/user-update.component';
import { ResumeFormComponent } from './componement/resume-form/resume-form.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './DashboardAdmin/Dashboard/dashboard/dashboard.component';
import { AddFormComponent } from './componement/add-form/add-form.component';
import { FormComponent } from './componement/formoffre/form.component';
import { OfferCardComponent } from './componement/offer-card/offer-card.component';
import { DetailsoffreComponent } from './componement/detailsoffre/detailsoffre.component';
import { EditFormComponent } from './componement/edit-form/edit-form.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ConfirmationDialogComponent } from './DashboardAdmin/confirmation-dialog/confirmation-dialog.component';
import { RatingPopupComponent } from './rating-popup/rating-popup.component';
import { DemoAngularMaterialModule } from './DemoAngularMaterialModule';
import { FormStepperComponent } from './DashboardAdmin/form-stepper/form-stepper.component';
import { PackComponent } from './DashboardAdmin/pack/pack.component';
import { ListApplicationsComponent } from './componement/list-applications/list-applications.component';
import { DetailsApplicationComponent } from './componement/details-application/details-application.component';
import { AddApplicationComponent } from './componement/add-application/add-application.component';
import { UpdateApplicationComponent } from './componement/update-application/update-application.component';
import { QuizComponent } from './componement/quiz/quiz.component';
import { StatisticsComponent } from './componement/statistics/statistics.component';
import { ScorePopupComponent } from './componement/score-popup/score-popup.component';
import { ListInterviewsComponent } from './componement/list-interviews/list-interviews.component';
import { ScheduleInterviewComponent } from './componement/schedule-interview/schedule-interview.component';
import { InterviewDetailsComponent } from './componement/interview-details/interview-details.component';
import { MeetingComponent } from './componement/meeting/meeting.component';
import { MapComponent } from './componement/map/map.component';
import { AuctionCardComponent } from './DashboardAdmin/Auction/auction-card/auction-card.component';
import { AddBidComponent } from './DashboardAdmin/Bid/AddBid/add-bid/add-bid.component';
import { ListBidComponent } from './DashboardAdmin/Bid/ListBid/list-bid/list-bid.component';
import { initializeApp } from "firebase/app";
import { environment } from 'environment/environment';
import { CountdownTimerComponent } from './DashboardAdmin/Auction/auction-card/countdown-timer/countdown-timer/countdown-timer.component';
import { BidDetailsComponent } from './DashboardAdmin/Bid/BidDetails/bid-details/bid-details.component';
import { ChatComponent } from './DashboardAdmin/chat/chat/chat.component';
import { DeviListComponent } from './DashboardAdmin/Devi/DeviList/devi-list/devi-list.component';
import { AddDeviComponent } from './DashboardAdmin/Devi/AddDevi/add-devi/add-devi.component';
import { PostItemsComponent } from './DashboardAdmin/PostItems/post-items/post-items.component';
import { UpdateItemComponent } from './DashboardAdmin/updateItems/update-item/update-item.component';
import { ReclamationServicesComponent } from './componement/reclamation-services/reclamation-services.component';
import { PostReclamationComponent } from './componement/reclamation-services/PostReclamation/post-reclamation/post-reclamation.component';
import { UpdateReclamationComponent } from './componement/reclamation-services/Update/update-reclamation/update-reclamation.component';
import { IgxBadgeModule, IgxButtonGroupModule, IgxButtonModule, IgxCardModule, IgxCheckboxModule, IgxIconModule, IgxInputGroupModule, IgxMaskModule, IgxRadioModule, IgxSelectModule, IgxStepperModule } from 'igniteui-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { PostlistComponent } from './Forum/post/postlist/postlist.component';
import { CreatepostComponent } from './Forum/createpost/createpost/createpost.component';
import { CreatecommentComponent } from './Forum/createcomment/createcomment.component';
import { ListecommentComponent } from './Forum/listecomment/listecomment.component';
import { StatestiqueReclamationComponent } from './statestique-reclamation/statestique-reclamation.component';
import { ConfirmationDialogFComponent } from './confirmation-dialog/confirmation-dialog.component';
import { UsernameComponent } from './Forum/ChatRoom/username/username/username.component';
import { PostReservationComponent } from './DashboardAdmin/reservation/post-reservation/post-reservation.component';
import { ChatAzizComponent } from './componement/chat-aziz/chat-aziz.component';
import { ListStandComponent } from './DashboardAdmin/list-stand/list-stand.component';
import { PostSessionComponent } from './DashboardAdmin/PostSession/post-session/post-session.component';
import { fabric } from 'fabric';
import { ListItemsComponent } from './DashboardAdmin/PostItems/post-items/allItems/list-items/list-items.component';
import { DMComponent } from './componement/dm/dm.component';
import { ListCompanyComponent } from './componement/list-company/list-company.component';
import { SentimentComponent } from './componement/sentiment/sentiment.component';
import { CustomFormComponent } from './componement/CustomFormComponent/custom-form/custom-form.component';
import { ProfileComponent } from './componement/profile/profile/profile.component';


initializeApp(environment.firebaseConfig);

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'Pi-Dev',
        clientId: 'pidev-client-ang'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      bearerExcludedUrls: ['/assets', '/clients/public'],
    });
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CardComponent,
    CompanyCardComponent,
    ContactComponent,
    FooterComponent,
    HomeComponent,
    InfoForumComponent,
    FrontOfficeComponent,
    Home2Component,
    SliderComponent,
    ForumComponent,
    UserInfoComponent,
    AdminKeycloakComponent,
    RoleSelectionComponent,
    StudentInfoPageComponent,
    TeacherInfoPageComponent,
    CompanyInfoPageComponent,
    AlumniInfoPageComponent,
    UserInfoModalComponent,
    UserUpdateComponent,
    ResumeFormComponent,
    Error404Component,
    UpdateItemComponent,
    AuctionCardComponent,
    PostItemsComponent,
    AddBidComponent,
    ListBidComponent,
    CountdownTimerComponent,
    BidDetailsComponent,
    ChatComponent,
    DeviListComponent,
    AddDeviComponent,
    DashboardComponent,
    AddFormComponent,
    FormComponent,
    OfferCardComponent,
    DetailsoffreComponent,
    EditFormComponent,
    FavoritesComponent,
    ConfirmationDialogComponent,
    ConfirmationDialogFComponent,
    RatingPopupComponent,
    ListApplicationsComponent,
    DetailsApplicationComponent,
    AddApplicationComponent,
    UpdateApplicationComponent,
    QuizComponent,
    StatisticsComponent,
    ScorePopupComponent,
    ListInterviewsComponent,
    ScheduleInterviewComponent,
    InterviewDetailsComponent,
    MeetingComponent,
    MapComponent,
    FormStepperComponent,
    PackComponent,
    ReclamationServicesComponent,
    PostReclamationComponent,
    UpdateReclamationComponent,
    PostlistComponent,
    CreatepostComponent,
    CreatecommentComponent,
    ListecommentComponent,
    StatestiqueReclamationComponent,
    ChatComponent,
    UsernameComponent,
    PostReservationComponent,
    ChatAzizComponent,
    ListStandComponent,
    PostSessionComponent,
    ListItemsComponent,
    DMComponent,
    ListCompanyComponent,
    SentimentComponent,
    CustomFormComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    KeycloakAngularModule,
    DemoAngularMaterialModule,
  
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService]
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
