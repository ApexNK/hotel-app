import { LoginPage } from './login/login';
import { UserCenterPage } from './user-center/user-center';
import { SignupPage } from  './signup/signup';
import { TutorialPage } from './tutorial/tutorial';
import { WelcomePage } from './welcome/welcome';
import { BalancePage } from './balance/balance';
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
    component: UserCenterPage,
    segment: 'UserCenterPage' ,
    name: 'TabsPage.UserCenterPage'
  },
  {
    component: BalancePage,
    segment: 'BalancePage',
    name: 'BalancePage'
  }
];
