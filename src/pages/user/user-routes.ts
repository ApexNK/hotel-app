import { LoginPage } from './login/login';
import { UserCenterPage } from './user-center/user-center';
import { SignupPage } from  './signup/signup';
import { TutorialPage } from './tutorial/tutorial';
import { WelcomePage } from './welcome/welcome';
import { BalancePage } from './balance/balance';
import { BalanceDetailPage } from './balance-detail/balance-detail';
import { RechargePage } from  './recharge/recharge';
import { IdentityAuditPage } from './identity-audit/identity-audit';
import { AuditStatePage } from './audit-state/audit-state';
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
  ,
  {
    component: BalanceDetailPage,
    segment: 'BalanceDetailPage',
    name: 'BalanceDetailPage'
  },
  {
    component: RechargePage,
    segment: 'RechargePage',
    name: 'RechargePage'
  },
  {
    component: IdentityAuditPage,
    segement: 'IdentityAuditPage',
    name: 'IdentityAuditPage'
  },
  {
    component: AuditStatePage,
    segement: 'AuditStatePage',
    name: 'AuditStatePage'
  }
];
