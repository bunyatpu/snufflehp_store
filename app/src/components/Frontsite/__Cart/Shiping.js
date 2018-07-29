import React,{Component} from 'react'
import { 
  Tab,
  Button,
  Icon
} from 'semantic-ui-react'

class Shiping extends Component{

  constructor(props){
    super(props)


    this.state = {
      //active:(props.weight > 4000)?'normal':'regis',
      active:'',
      priceNow:0,
      initPrinceShip:{
        normal:20,
        ems:60,
        regis:40
      }
    }
  }

  componentDidMount(){

    // const { weight,sumPlusPaking } = this.props
    // const { initPrinceShip } = this.state

    // console.log('componentDidMount  props:',this.props,'state',this.state)

    // let seDefaulType = (weight > 4000) ? 'normal':'regis'

    //this.handleSelShipping({price:initPrinceShip[seDefaulType] + sumPlusPaking})
  }

  componentWillReceiveProps(nextProps){

    // if(nextProps.weight !== this.props.weight){
    //   if(this.state.active !== 'ems'){
    //     let selNow  = (nextProps.weight > 4000)?'normal':'regis'
    //     this.setState({active:selNow})
    //   }
    // }

  }

  selectShip = (e,data) =>{
    //console.log('selectShip',e,data)

    this.setState({active:data.type})
    this.handleSelShipping(data)
  }

  handleTabChange = (e,data) =>{
    //console.log(e,data)

    //console.log(data.panes)
    this.setState({active:data.panes[data.activeIndex]['defaultVale']})

    this.handleSelShipping({price:data.panes[data.activeIndex]['defaultPrice']})

    
  }

  handleSelShipping = (data) =>{

    this.props.handleSelShipping({selShiping:data.type})
  }

  render(){

    const color = {style:{}};
    const color2 = {color:'green'}

    //const { active,initPrinceShip } = this.state
    const { weight ,priceShiping,selShiping} = this.props

    //const selBtn = (active === 'ems') ? 'ems': 

    let btnSet =[]
    btnSet['normal'] = {...color}
    btnSet['regis'] = {...color}
    btnSet['ems'] = {...color}
    btnSet['kerry'] = {...color}
    btnSet[selShiping] = color2;

   
    //console.log(btnSet.regis.color)

    const panes = [
      { 
        menuItem: 'ไปรษณีย์ไทย',
        defaultVale:'normal' ,
        defaultPrice:"50",
        render: () => <Tab.Pane>
          {
            weight > 4000 &&
            <Button type="normal" price={priceShiping.normal} onClick={this.selectShip} basic {...btnSet['normal']}>
              { btnSet.normal.color !== undefined && <Icon name='check' /> }
              <span>พัสดุไปรษณีย์ {priceShiping.normal} บาท</span>
            </Button>
          }
          { 
            weight <= 4000 &&
            <Button type="regis" price={priceShiping.regis}  onClick={this.selectShip} basic  {...btnSet['regis']} >
              {btnSet.regis.color !== undefined && <Icon name='check' /> }
              <span>ลงทะเบียน {priceShiping.regis} บาท</span>
            </Button>
          }
          <Button type="ems" price={priceShiping.ems}  onClick={this.selectShip}  basic {...btnSet['ems']}  >
            { btnSet.ems.color !== undefined && <Icon name='check' /> }
            <span>EMS {priceShiping.ems} บาท</span>
          
          </Button>
        </Tab.Pane> 
      },
      // { 
      //   menuItem: 'Kerry express', 
      //   defaultVale:'kerry' ,
      //   defaultPrice:"130",
      //   render: () => <Tab.Pane>
      //    <Button type="kerry" price="130" onClick={this.selectShip}  basic {...btnSet['kerry']}  >
      //       { btnSet.kerry.color !== undefined && <Icon name='check' /> }
      //       Kerry express
      //     </Button>
      //   </Tab.Pane> 
      // }
    ]
    
    return (
      <Tab panes={panes} onTabChange={this.handleTabChange} />
    )
  }
}

export default Shiping