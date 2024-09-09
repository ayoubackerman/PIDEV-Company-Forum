import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UserInfoComponent } from './componement/user-info/user-info.component';
import { AdminKeycloakComponent } from './componement/admin-keycloak/admin-keycloak.component';
import { RoleSelectionComponent } from './componement/role-selection/role-selection.component';
import { StudentInfoPageComponent } from './componement/student-info-page/student-info-page.component';
import { TeacherInfoPageComponent } from './componement/teacher-info-page/teacher-info-page.component';
import { CompanyInfoPageComponent } from './componement/company-info-page/company-info-page.component';
import { AlumniInfoPageComponent } from './componement/alumni-info-page/alumni-info-page.component';
import { UserUpdateComponent } from './componement/user-update/user-update.component';
import { ContactComponent } from './componement/Contact/contact/contact.component';
import { CompanyCardComponent } from './componement/CompanyCard/company-card/company-card.component';
import { InfoForumComponent } from './componement/Info/info-forum/info-forum.component';
import { Error404Component } from './componement/error404/error404/error404.component';
import { PostItemsComponent } from './DashboardAdmin/PostItems/post-items/post-items.component';
import { ListItemsComponent } from './DashboardAdmin/PostItems/post-items/allItems/list-items/list-items.component';
import { DashboardComponent } from './DashboardAdmin/Dashboard/dashboard/dashboard.component';
import { ReclamationServicesComponent } from './componement/reclamation-services/reclamation-services.component';
import { PostReclamationComponent } from './componement/reclamation-services/PostReclamation/post-reclamation/post-reclamation.component';
import { UpdateReclamationComponent } from './componement/reclamation-services/Update/update-reclamation/update-reclamation.component';
import { PostlistComponent } from './Forum/post/postlist/postlist.component';
import { CreatecommentComponent } from './Forum/createcomment/createcomment.component';
import { ListecommentComponent } from './Forum/listecomment/listecomment.component';
import { StatestiqueReclamationComponent } from './statestique-reclamation/statestique-reclamation.component';
import { ListApplicationsComponent } from './componement/list-applications/list-applications.component';
import { QuizComponent } from './componement/quiz/quiz.component';
import { DetailsApplicationComponent } from './componement/details-application/details-application.component';
import { InterviewDetailsComponent } from './componement/interview-details/interview-details.component';
import { ScheduleInterviewComponent } from './componement/schedule-interview/schedule-interview.component';
import { ListInterviewsComponent } from './componement/list-interviews/list-interviews.component';
import { MeetingComponent } from './componement/meeting/meeting.component';
import { MapComponent } from './componement/map/map.component';
import { AddApplicationComponent } from './componement/add-application/add-application.component';
import { UpdateApplicationComponent } from './componement/update-application/update-application.component';
import { StatisticsComponent } from './componement/statistics/statistics.component';
import { ListBidComponent } from './DashboardAdmin/Bid/ListBid/list-bid/list-bid.component';
import { AuctionCardComponent } from './DashboardAdmin/Auction/auction-card/auction-card.component';
import { CardItemsComponent } from './DashboardAdmin/PostItems/post-items/CardItems/card-items/card-items.component';
import { ChatComponent } from './DashboardAdmin/chat/chat/chat.component';
import { DeviListComponent } from './DashboardAdmin/Devi/DeviList/devi-list/devi-list.component';
import { EditFormComponent } from './componement/edit-form/edit-form.component';
import { CardComponent } from './componement/Card/card/card.component';
import { FormComponent } from './componement/formoffre/form.component';
import { AddFormComponent } from './componement/add-form/add-form.component';
import { OfferCardComponent } from './componement/offer-card/offer-card.component';
import { DetailsoffreComponent } from './componement/detailsoffre/detailsoffre.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FormStepperComponent } from './DashboardAdmin/form-stepper/form-stepper.component';
import { PackComponent } from './DashboardAdmin/pack/pack.component';
import { ListReservationComponent } from './DashboardAdmin/reservation/ListReservation/list-reservation/list-reservation.component';
import { PostReservationComponent } from './DashboardAdmin/reservation/post-reservation/post-reservation.component';
import { HomeComponent } from './componement/home/home/home.component';
import { ChatAzizComponent } from './componement/chat-aziz/chat-aziz.component';
import { ListSessionComponent } from './DashboardAdmin/PostSession/post-session/allSession/list-session/list-session.component';
import { PlaceComponent } from './DashboardAdmin/place/place.component';
import { ListStandComponent } from './DashboardAdmin/list-stand/list-stand.component';
import { PackListComponent } from './DashboardAdmin/pack-list/pack-list.component';
import { PostSessionComponent } from './DashboardAdmin/PostSession/post-session/post-session.component';
import { Home2Component } from './componement/home2/home2/home2.component';
import { FrontOfficeComponent } from './componement/front-office/front-office/front-office.component';
import { DMComponent } from './componement/dm/dm.component';
import { SentimentComponent } from './componement/sentiment/sentiment.component';
import { ProfileComponent } from './componement/profile/profile/profile.component';




const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: FrontOfficeComponent },
  { path: 'exposant', component: CompanyCardComponent },
  { path: 'info-pratiques', component: InfoForumComponent },
  { path: 'UserInfo', component: RoleSelectionComponent, canActivate: [AuthGuard] },
  { path: 'adminKeyCloak', component: AdminKeycloakComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'student-page', component: StudentInfoPageComponent, canActivate: [AuthGuard] },
  { path: 'teacher-page', component: TeacherInfoPageComponent, canActivate: [AuthGuard] },
  { path: 'company-page', component: CompanyInfoPageComponent, canActivate: [AuthGuard] },
  { path: 'alumni-page', component: AlumniInfoPageComponent, canActivate: [AuthGuard] },
  { path: 'chooseRole', component: RoleSelectionComponent, canActivate: [AuthGuard] },
  { path: 'updateProfile', component: UserUpdateComponent, canActivate: [AuthGuard] },
  { path: 'appList', component: ListApplicationsComponent },
  { path: 'quiz', component: QuizComponent , canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent },
  { path: 'application-details/:codeCandidature', component: DetailsApplicationComponent },
  { path: 'interview-details/:codeInterview', component: InterviewDetailsComponent },
  { path: 'scheduleInterview/:id', component: ScheduleInterviewComponent },
  { path: 'interviewList', component: ListInterviewsComponent },
  { path: 'meeting', component: MeetingComponent, canActivate: [AuthGuard] },
  { path: 'map', component: MapComponent },
  { path: 'addApp/:reference', component: AddApplicationComponent, canActivate: [AuthGuard] },
  { path: 'editApp/:id', component: UpdateApplicationComponent },
  { path: 'stat', component: StatisticsComponent },
  { path: 'Items', component: ListItemsComponent, canActivate: [AuthGuard] },
  { path: 'Bid', component: ListBidComponent , canActivate: [AuthGuard]},
  { path: 'Auction', component: AuctionCardComponent },
  { path: 'i', component: CardItemsComponent },
  { path: 'chat', component: ChatComponent , canActivate: [AuthGuard]},
  { path: 'chatroom/:userId', component: ChatAzizComponent },
  { path: 'devi', component: DeviListComponent , canActivate: [AuthGuard]},
  { path: 'edit-form/:reference', component: EditFormComponent },
  { path: 'exposant', component: CompanyCardComponent },
  { path: 'info-pratiques', component: InfoForumComponent },
  { path: 'card', component: CardComponent },
  { path: 'dashboard/admin/item', component: PostItemsComponent },
  { path: 'dashboard/admin/listt', component: ListItemsComponent },
  { path: 'form', component: FormComponent },
  { path: 'add-form', component: AddFormComponent, canActivate: [AuthGuard] },
  { path: 'offercard', component: OfferCardComponent, canActivate: [AuthGuard] },
  { path: 'detailoffer/:reference', component: DetailsoffreComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'dashboard/admin/session', component: PostSessionComponent },
  { path: 'reservation', component: ListReservationComponent },
  { path: 'Add/reservation/:id', component: PostReservationComponent },
  { path: 'forr', component: FormStepperComponent },
  { path: 'pack', component: PackComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'reclamation', component: ReclamationServicesComponent },
  { path: 'addreclamation', component: PostReclamationComponent, canActivate: [AuthGuard] },
  { path: 'updatereclamation/:id', component: UpdateReclamationComponent },
  { path: 'getidtocomment/:id', component: CreatecommentComponent, canActivate: [AuthGuard] },
  { path: 'comments/:postId', component: ListecommentComponent },
  { path: 'post', component: PostlistComponent, canActivate: [AuthGuard] },
  { path: 'rec', component: StatestiqueReclamationComponent },
  { path: 'dashboard/admin/list', component: ListSessionComponent },
  { path: 'place', component: PlaceComponent },
  { path: 'pack/List', component: PackListComponent },
  { path: 'standss/:idsessions/:idpack/:email', component: ListStandComponent },
  { path: 'dm', component: DMComponent },
  { path: 'sentiment', component: SentimentComponent },
  { path: 'not-found', component: Error404Component },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
