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
      },
      initPriceShiping:{
        normal:20,
        regis:40,
        ems:60
      }
    }
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
 
    this.props.handleSelShipping({selShiping:data.type})
  }

  handleTabChange = (e,data) =>{
    
    console.log('handleTabChange',data)
  }



  render(){

    const color = {style:{}};
    const color2 = {color:'green'}

    const { initPriceShiping } = this.state
    const { weight,selShiping,sumPlusPaking} = this.props

  

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
            <Button type="normal" price={initPriceShiping.normal + sumPlusPaking} onClick={this.selectShip} basic {...btnSet['normal']}>
              { btnSet.normal.color !== undefined && <Icon name='check' /> }
              <span>พัสดุไปรษณีย์ {initPriceShiping.normal+sumPlusPaking} บาท</span>
            </Button>
          }
          { 
            weight <= 4000 &&
            <Button type="regis" price={initPriceShiping.regis+sumPlusPaking}  onClick={this.selectShip} basic  {...btnSet['regis']} >
              {btnSet.regis.color !== undefined && <Icon name='check' /> }
              <span>ลงทะเบียน {initPriceShiping.regis+sumPlusPaking} บาท</span>
            </Button>
          }
          <Button type="ems" price={initPriceShiping.ems+sumPlusPaking}  onClick={this.selectShip}  basic {...btnSet['ems']}  >
            { btnSet.ems.color !== undefined && <Icon name='check' /> }
            <span>EMS {initPriceShiping.ems+sumPlusPaking} บาท</span>
          
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