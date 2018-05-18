import Home from '../components/Frontsite/Home'
import AdminProduct from '../components/Admin/AdminProduct'

export default {

	admin:[
		{
			icon: 'dashboard',
			label: 'Dashboard',
			to: '/admin/dashboard',
		},
		{
			icon: 'list',
			label: 'สินค้า',
			component: AdminProduct,
			to: '/admin/products',
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