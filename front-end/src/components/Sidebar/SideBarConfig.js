import costIcon from '../../assets/costIcon.png';
import awsIcon from '../../assets/awsIcon.png';
import userIcon from '../../assets/userIcon.png';
import onboardingIcon from '../../assets/onboardingIcon.png';
const sideBarItems = [
    {
        name: 'Cost Explorer',
        path: '/dashboard/CostExplorer',
        icon: costIcon,
        readOnly: true,
      },
      {
        name: 'AWS Services',
        path: '/dashboard/AwsService',
        icon: awsIcon,
        readOnly: true,
      },
      {
        name: 'Onboarding',
        path: '/dashboard/OnBoarding',
        icon: onboardingIcon,
        readOnly: false,
      },
      {
        name: 'User Management',
        path: '/dashboard/UserManagement',
        icon: userIcon,
        readOnly: true,
      }
    ];
  
  export default sideBarItems;
  