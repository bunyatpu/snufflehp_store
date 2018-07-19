import Home from '../components/Frontsite/Home'
import Product from '../components/Frontsite/Product'
import User from '../components/Frontsite/User'
import Cart from '../components/Frontsite/Cart'

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
		},
		{
			path:'/user',
			component: User,
			exact:false,
			routes:[]
		},
		{
			path:'/cart',
			component: Cart,
			exact:false,
			routes:[]
		}
	
		
	]

}
