import { LoginPage } from './login/login';
import { SettingsPage } from './settings/settings';
import { SignupPage } from  './signup/signup';
import { TutorialPage } from './tutorial/tutorial';
import { WelcomePage } from './welcome/welcome';
export const UserRoutes = [
  {
    component: LoginPage,
    segment: 'LoginPage'
  },

  {
    component: SignupPage,
    segment: 'SignupPage'
  },
  {
    component: TutorialPage,
    segment: 'TutorialPage'
  },
  {
    component: WelcomePage,
    segment: 'WelcomePage'
  },
  {
    component: SettingsPage,
    segment: 'SettingsPage' ,
    name: 'TabsPage.SettingsPage'
  }
];
