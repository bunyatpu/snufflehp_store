import React,{Component} from 'react'
import { Field } from 'redux-form'
import { Grid ,Label,Message} from 'semantic-ui-react'
import {
  RenderTextField,
  renderDropdownField
} from './RenderFields'
const datas = require('../../../data.json');
const JQL = require('../../../JQL/src');


class AddrField extends Component {

  constructor(props){
    super(props)
    this.state = {

      optionZipcode:[],
      optionSubDistrict:[],
      optionDistrict:[],
      optionProvince:[],
      showFullAddr:false,
      zipCodeValue:"",
      db:''

    }
    //console.log('const')
  }

  componentDidMount(){
    //console.log('componentDidMount')
    const { inital } = this.props;

    const preData = this.preData();
    const DB = new JQL(preData);
    this.setState({
      preData,
      db:DB
    });

    //console.log('componentDidMount')
    //this.props.change('postCode','ดอยลาน_เมืองเชียงราย_เชียงราย_57000')

    //check initail update
    //console.log('inital',inital);
    if(inital !== undefined){

      let value = inital.sub_district+'_'+inital.district+'_'+inital.province+'_'+inital.postCode
      let content = inital.sub_district+' > '+inital.district+' > '+inital.province+' > '+inital.postCode

      //postCode
      let text = inital.postCode
      this.setState({
        optionZipcode:[{key:0,text, value, content}]
      })
      this.props.change('postCode',value)

      //sub_district
      text = inital.sub_district
      this.setState({
        optionSubDistrict:[{key:0,text, value, content}]
      })
      this.props.change('sub_district',value)

      //district
      text = inital.district
      this.setState({
        optionDistrict:[{key:0,text, value, content}]
      })
      this.props.change('district',value)

      //province
      text = inital.province
      this.setState({
        optionProvince:[{key:0,text, value, content}]
      })
      this.props.change('province',value)

      this.props.change('addr',inital.addr)
    }


   

    //--
   
  }

  preData = () =>{

    const expanded = [];
    datas.forEach((provinceEntry) => {
      const province = provinceEntry[0];
      const amphurList = provinceEntry[1];
      amphurList.forEach((amphurEntry) => {
        const amphur = amphurEntry[0];
        const districtList = amphurEntry[1];
        districtList.forEach((districtEntry) => {
          const district = districtEntry[0];
          const zipCodeList = districtEntry[1];
          zipCodeList.forEach((zipCode) => {
            expanded.push({
              d: district,
              a: amphur,
              p: province,
              z: zipCode,
            });
          });
        });
      });
    });

    //console.log('all data',expanded);
    return expanded;

  }

  searchAddr = (type,searchStr) =>{

    let res = [];
    // let searchStr = '57000'
    // let type = 'z';
    try {
      res = this.state.db.select('*').where(type)
              .match(`^${searchStr}`)
              .orderBy(type)
              .fetch();

      // res = this.state.preData.filter((model)=>{
      //   //console.log(model[type]," === ",searchStr)
      //   //return model[type] == searchStr
      //   const regex = RegExp(searchStr,'gi');
      //   return regex.test(model[type])
      // })
    } catch (e) {
      return [];
    }

    //console.log('res',res)
    let mapZip = res
        .filter((item, i) => i < 500)
        .map((obj,key)=>{
          
          const txt = obj.d+' > '+obj.a+' > '+obj.p+' > '+obj.z
          const valueTxt = obj.d+'_'+obj.a+'_'+obj.p+'_'+obj.z
          //const resTxt = txt.replace(reg, '<b>'+searchQuery+'</b>');
          return {key:key,text:obj[type], value:valueTxt,content:txt}
        })
    
    let optName = '';
    switch(type){
      case 'd':
        optName = 'optionSubDistrict'
      break;
      case 'a':
        optName = 'optionDistrict'
      break;
      case 'p':
        optName = 'optionProvince'
      break;
      case 'z':
        optName = 'optionZipcode'
      break;
      default:

      break;
    }
    this.setState({[optName]:mapZip})

    //return possibles

  }

  handleChangeOption = (e,value) => {
   
    //console.log('handleChangeOption value',value);

    const arrAddr = value.split('_');
    //console.log('arrAddr',arrAddr)
    this.searchAddr('d',arrAddr[0])
    this.searchAddr('a',arrAddr[1])
    this.searchAddr('p',arrAddr[2])
    this.searchAddr('z',arrAddr[3])

    this.props.change('sub_district',value)
    this.props.change('district',value)
    this.props.change('province',value)
    this.props.change('postCode',value)

    const textAdd = 'ตำบล'+arrAddr[0]+' อำเภอ'+arrAddr[1]+' จังหวัด'+arrAddr[2]+' '+arrAddr[3]
    this.setState({zipCodeValue:textAdd})

  }

  handleSearchChange = (type) => (e, { searchQuery }) =>{

    this.searchAddr(type,searchQuery)

  }

  showFullAddr = () => {
    this.setState({ showFullAddr:true })
  }

  render(){

    let style = {
      row:{
        paddingTop:'7px',
        paddingBottom:'7px'
      },
      row_devide:{
        paddingTop:'0px',
        paddingBottom:'0px'
      }

    }

    let {
      optionZipcode,
      optionSubDistrict,
      optionDistrict,
      optionProvince,
      showFullAddr,
      zipCodeValue
    } = this.state;


    return (
      <div>
        {
          !showFullAddr &&
        <Grid>
        
          <Grid.Row style={style.row}>
            <Grid.Column width={16}>
              <Field 
                  name="postCode" 
                  toplabel="รหัสไปรษณีย์"
                  component={renderDropdownField} 
                  label={false}
                  options={optionZipcode}
                  placeholder="กรอก รหัสไปรษณีย์"
                  onChange={this.handleChangeOption}
                  search
                  noResultsMessage='พิมพ์รหัสไปรษณีย์ เพื่อค้นหา'
                  minCharacters={2}
                  onSearchChange={this.handleSearchChange('z')}
                />
            
            </Grid.Column >
          </Grid.Row>
        </Grid>  
        }  

        <Grid style={{display:(showFullAddr)?'block':'none'}}>
          <Grid.Row style={style.row}>
            <Grid.Column width={16}>
                <Field 
                  name="sub_district" 
                  toplabel="ตำบล"
                  component={renderDropdownField} 
                  label={false}
                  options={optionSubDistrict}
                  placeholder="ตำบล"
                  onChange={this.handleChangeOption}
                  search
                  noResultsMessage='พิมพ์ชื่อตำบลเพื่อค้นหา'
                  onSearchChange={this.handleSearchChange('d')}
                />
            </Grid.Column >
          </Grid.Row>
          <Grid.Row style={style.row}>
            <Grid.Column width={16}>
                <Field 
                  name="district" 
                  toplabel="อำเภอ"
                  component={renderDropdownField} 
                  label={false}
                  options={optionDistrict}
                  placeholder="อำเภอ"
                  onChange={this.handleChangeOption}
                  search
                  noResultsMessage='พิมพ์ชื่ออำเภอเพื่อค้นหา'
                  onSearchChange={this.handleSearchChange('a')}
                />
            </Grid.Column >
          </Grid.Row>
          <Grid.Row style={style.row}>
            <Grid.Column width={16}>
              <Field 
                  name="province" 
                  toplabel="จังหวัด"
                  component={renderDropdownField} 
                  label={false}
                  options={optionProvince}
                  placeholder="จังหวัด"
                  onChange={this.handleChangeOption}
                  search
                  noResultsMessage='พิมพ์ชื่อจังหวัดเพื่อค้นหา'
                  onSearchChange={this.handleSearchChange('p')}
                />
            </Grid.Column >
          </Grid.Row>
          
        </Grid>

        <Grid>  
          <Grid.Row style={style.row}>
            <Grid.Column width={16}>
              <Field 
                  name="addr" 
                  toplabel="ที่อยู่"
                  component={RenderTextField} 
                  label={false}
                  placeholder="ที่อยู่"
                />
            </Grid.Column >
          </Grid.Row>

        </Grid>

        <Grid style={{display:(zipCodeValue)?'block':'none'}}>
          <Grid.Row style={style.row}>
              <Grid.Column width={16} textAlign="center">
                <Message
                    info
                    size="small"
                    content={zipCodeValue}
                  />
              </Grid.Column >
            </Grid.Row>
        </Grid>

        <Grid style={{display:(!showFullAddr)?'block':'none'}}>  
          <Grid.Row style={style.row}>
            <Grid.Column width={16} textAlign="center">
              <Label as='a' onClick={this.showFullAddr}>ลืมรหัสไปรษณีย์</Label>
            </Grid.Column >
          </Grid.Row>
          
        
        </Grid>
 
      
      </div>
    )
    
  }

}


export default AddrField