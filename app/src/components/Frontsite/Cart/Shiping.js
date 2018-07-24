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
      active:(props.weight > 4000)?'normal':'regis',
      priceNow:0,
      initPrinceShip:{
        normal:20,
        ems:60,
        regis:40
      }
    }
  }

  componentDidMount(){

    const { weight,sumPlusPaking } = this.props
    const { initPrinceShip } = this.state

    console.log('componentDidMount  props:',this.props,'state',this.state)

    let seDefaulType = (weight > 4000) ? 'normal':'regis'

    this.handleSelShipping({price:initPrinceShip[seDefaulType] + sumPlusPaking})
  }

  componentWillReceiveProps(nextProps){
    //console.log('componentWillReceiveProps',this.props,'state',this.state,'nextProps',nextProps)

    // let selNow = 'ems'

    // if(this.state.active !== 'ems'){
    //   selNow = (this.props.weight > 4000)?'normal':'regis'
    // }

    //let selNow  = (this.props.weight > 4000)?'normal':'regis'
    //this.setState({active:selNow})
    if(nextProps.weight !== this.props.weight){
      if(this.state.active !== 'ems'){
        let selNow  = (nextProps.weight > 4000)?'normal':'regis'
        this.setState({active:selNow})
      }
    }

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

    this.props.handleSelShipping({price:data.price})
  }

  render(){

    const color = {style:{boxShadow:'none'}};
    const color2 = {color:'green'}

    const { active,initPrinceShip } = this.state
    const { weight,sumPlusPaking } = this.props

    //const selBtn = (active === 'ems') ? 'ems': 

    let btnSet =[]
    btnSet['normal'] = {...color}
    btnSet['regis'] = {...color}
    btnSet['ems'] = {...color}
    btnSet['kerry'] = {...color}
    btnSet[active] = color2;

   
    //console.log(btnSet.regis.color)

    const panes = [
      { 
        menuItem: 'ไปรษณีย์ไทย',
        defaultVale:'normal' ,
        defaultPrice:"50",
        render: () => <Tab.Pane>
          {
            weight > 4000 &&
            <Button type="normal" price={initPrinceShip.normal + sumPlusPaking} onClick={this.selectShip} basic {...btnSet['normal']}>
              { btnSet.normal.color !== undefined && <Icon name='check' /> }
              <span>พัสดุไปรษณีย์ {initPrinceShip.normal + sumPlusPaking} บาท</span>
            </Button>
          }
          { 
            weight <= 4000 &&
            <Button type="regis" price={initPrinceShip.regis + sumPlusPaking}  onClick={this.selectShip} basic  {...btnSet['regis']} >
              {btnSet.regis.color !== undefined && <Icon name='check' /> }
              <span>ลงทะเบียน {initPrinceShip.regis + sumPlusPaking} บาท</span>
            </Button>
          }
          <Button type="ems" price={initPrinceShip.ems + sumPlusPaking}  onClick={this.selectShip}  basic {...btnSet['ems']}  >
            { btnSet.ems.color !== undefined && <Icon name='check' /> }
            <span>EMS {initPrinceShip.ems + sumPlusPaking} บาท</span>
          
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