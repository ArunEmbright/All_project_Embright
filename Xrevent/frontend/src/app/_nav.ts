import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
   // badge: {
    //  variant: 'info',
      //text: 'NEW'
    //}
  },
  
  {
    title: true,
    name: 'Management'
  },
  {
    name: 'Speakers',
    url: '/speaker',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'List Speaker',
        url: '/speaker/list-speaker',
        icon: 'icon-puzzle'
      },
      {
        name:'Create Speaker',
        url:'speaker/CreateSpeaker',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Events',
    url: '/events',
    icon: 'icon-cursor',
    children: [
      {
        name: 'List Events',
        url: 'events/list-events',
        icon: 'icon-cursor'
      },
      {
        name: 'Create Events',
        url: '/events/create-events',
        icon: 'icon-cursor'
      },
      {
        name: 'My events',
        url: '/events/my-events',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Exhibitor',
    url: '/exhibitor',
    icon: 'icon-pie-chart',
    children:[
      {
        name:'List Exhibitors',
        url: '/exhibitor/list-exhibitors',
        icon:'icon-cursor'
      },
      {
        name: 'Create Exhibitor',
        url:'/exhibitor/create-exhibitor',
        icon:'icon-cursor'
      }
    ]
  },
  {
    name: 'Team',
    url: '/team',
    icon: 'icon-star',
    children: [
      {
        name: 'List-Team',
        url: '/team/list-team',
        icon: 'icon-star',
       
      },
      {
        name: 'Create-Team',
        url: '/team/create-team',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Product',
    url: '/products',
    icon: 'icon-bell',
    children: [
      {
        name: 'List-Product',
        url: '/products/list-product',
        icon: 'icon-bell'
      },
      {
        name: 'Create Products',
        url: '/products/create-product',
        icon: 'icon-bell'
      },
     
    ]
  },
  
  {
    name: 'Assets',
    url: '/assets',
    icon: 'icon-calculator',
    children:[
      {
        name:'List Assets',
        url:'/assets/list-assets',
        icon:'icon-bell'
      },
      {
        name:'Create Assets',
        url:'/assets/create-assets',
        icon:'icon-bell'
      }
    ]
  
  },
];
