import Home from '../components/Frontsite/Home'

export default {

	admin:[
		{
			icon: 'dashboard',
			label: 'Dashboard',
			to: '/admin/dashboard',
		},
		{
			icon: 'user',
			label: 'Users',
			to: '/admin/User',
		}
	],
	frontSite:[
		{
			path:'/',
			component: Home,
			routes:[
				{ path: '/',component: Home}
			]
		}
	]

}