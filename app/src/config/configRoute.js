import Home from '../components/Frontsite/Home'
import Product from '../components/Frontsite/Product'

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
			path:'/product',
			component: Product,
			params:['productName'],
			exact:false,
			routes:[]
		}
	
		
	]

}
