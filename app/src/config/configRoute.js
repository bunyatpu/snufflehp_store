import Home from '../components/Frontsite/Home'
import Preorder from '../components/Frontsite/preorder'

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
			exact:true,
			routes:[]
		},
		{
			path:'/preorder1',
			component: Preorder,
			exact:false,
			routes:[]
		}
	
		
	]

}
