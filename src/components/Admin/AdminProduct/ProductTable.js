import React,{ Component } from 'react';
import { connect } from 'react-redux'
import {delProduct} from '../../../actions/product';
import { Icon,Confirm } from 'semantic-ui-react'
import NumberFormat from 'react-number-format';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import './TableStyle.css'


class ProductTable extends Component {

  constructor(props){
    super(props);
    this.state = {
      open: false,
      delVal:''
    }
  }

  showConfirm = (val) => this.setState({ open: true,delVal:val })

  handleConfirm = () => {

    //console.log(this.state.delVal);
    
    this.props.delProduct(this.state.delVal)
    this.setState({open: false,delVal:'' });
    

  }
  handleCancel = () => this.setState({open: false,delVal:'' })

  getColumn(){

    let gSty = {verticalAlign:'middle'};

    const columns = [
      // {
      //   Header: 'ภาพ',
      //   accessor: "img" ,// String-based value accessors!
      //   Cell: prop => <img src={prop.value} style={{height:'80px'}} alt="" />
      // },
      {
        Header: 'ชื่อ',
        accessor: "name",
        Cell: prop => <span style={gSty}>{prop.value}</span>
      }, 
      {
        Header: 'รหัส',
        accessor: "code",
        Cell: prop => <span style={gSty}>{prop.value}</span>
      },
      {
        Header: 'รายละเอียด',
        accessor: 'desc',
        Cell: prop => <span style={gSty}>{prop.value}</span>
      }, 
      {
        Header: 'ราคา',
        accessor: 'price',
        Cell: prop => 
          <span style={gSty}>
            <NumberFormat value={Number(prop.value).toFixed(2)} displayType={'text'}  thousandSeparator={true}  />
          </span>
      },
      {
        Header: 'จำนวน',
        accessor: 'amount',
        Cell: prop => <span style={gSty}>{prop.value}</span>
      },
      {
        Header:'จัดการ',
        accessor:'key',
        Cell: prop => 
          <span>
            <span>
              <Icon 
                name='edit' 
                className="handlePoint"
                circular 
                inverted 
                color='blue' 
              />
            </span>
            <span>
              <Icon name='delete' className="handlePoint"
                circular 
                inverted 
                color='red' 
                onClick={() => {this.showConfirm(prop.value)}}
              />
            </span>
          </span>
      }
    ]

    return columns;
  }

  render(){

    let columns = this.getColumn();
    //let lists = Object.values(this.props.products);

    let lists = [];
    const objRef = this.props.products;
    for (let [k, v] of Object.entries(objRef)) {
      v.key = k;
      lists.push(v);
    }

    
    return (
      <div>
        <ReactTable
          data={lists}
          columns={columns}
          defaultPageSize={10}
        />
        <Confirm
          open={this.state.open}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </div>
    )
  }

}


export default connect( ()=>({}) , {delProduct})(ProductTable);