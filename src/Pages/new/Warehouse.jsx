import { useState} from 'react';
import {Container, Button,Col, Form, Row} from 'react-bootstrap'
import {toast} from 'react-toastify'
import Loader from '../../components/Loader';
import { useAddDriverMutation } from '../../state/usersApiSlice';
import { useAddInventoryMutation } from '../../state/servicesApiSlice';
import StoreIcon from "@mui/icons-material/Store";
import './new.scss'
import {useSelector} from 'react-redux'

const Warehouse = () => {
    const [validated, setValidated] = useState(false);
    const [itemName, setItemName] = useState('')
    const [itemDescription, setItemDescription] = useState('')
    const [itemCategory, setItemCategory] = useState('')
    const [itemQuantity, setItemQuantity] = useState('')
    const [itemMeasurement, setItemMeasurement] = useState('')
    const [itemDimensions, setItemDimensions] = useState('')
    const [itemPackaging, setItemPackaging] = useState('')
    const [itemValue, setItemValue] = useState('')
    const [itemHandling, setItemHandling] = useState('')
    const [itemStorage, setItemStorage] = useState('')
    const [exitDate, setExitDate] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [customerEmail, setCustomerEmail] = useState('')
    const [price, setPrice] = useState('')
    const [customerMobile, setCustomerMobile] = useState('')
    const [addDriver] = useAddDriverMutation()
    const [addInventory] = useAddInventoryMutation()
    const {userInfo} = useSelector(state => state.auth)


    const handleInventory = async(event) => {
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else{
            setValidated(true);
        const inventoryData = {createdBy:userInfo, itemName, itemDescription, itemCategory, itemQuantity, itemMeasurement, itemDimensions,itemPackaging, itemValue,
          itemHandling, itemStorage, exitDate, customerName, customerEmail, customerMobile, price}
          try{
            addInventory(inventoryData).unwrap().then(res =>{
              toast.success(res?.message)
            }).catch(err =>{
              toast.error(err?.data?.message || err?.message)
            })
          }catch(err){
            toast.error( err?.message)
          }
        }
        
        
        };
  return (
    <div className='newItems'>
        <div className="top">
          <h1><StoreIcon/> Add Inventory</h1>
        </div>
         <div className="bottom ">
         <Container>
      <Form className='form' onSubmit={handleInventory}>
      <Row className='mb-3'>
        <Form.Group as={Col} sm='2' controlId='validationCustom01'>
            <Form.Label>Item Name</Form.Label>
            <Form.Control value={itemName} onChange={e => setItemName(e.target.value)} required className='formInput' type='text' placeholder='Item Name'/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} sm="3" controlId="validationCustom02">
            <Form.Label> Item Description</Form.Label>
            <Form.Control value={itemDescription} onChange={e => setItemDescription(e.target.value)}  required className='formInput' type="text" placeholder="Description"/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} sm='2' controlId='validationCustom01'>
            <Form.Label>Item Category</Form.Label>
            <Form.Control value={itemCategory} onChange={e => setItemCategory(e.target.value)} required className='formInput' type='text' placeholder='Email Address'/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} sm='2' controlId='validationCustom01'>
            <Form.Label>Item Quantity</Form.Label>
            <Form.Control value={itemQuantity} onChange={e => setItemQuantity(e.target.value)} required className='formInput' type='text' placeholder='Email Address'/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} sm="1" controlId="validationCustom02">
            <Form.Label> Measurement</Form.Label>
            <Form.Control value={itemMeasurement} onChange={e => setItemMeasurement(e.target.value)}  required className='formInput' type="text" placeholder="E.g.., Kilogram/ pieces"/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} sm='2' controlId='validationCustom01'>
            <Form.Label>Item Dimensions</Form.Label>
            <Form.Control value={itemDimensions} onChange={e => setItemDimensions(e.target.value)} required className='formInput' type='text' placeholder='Email Address'/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
    </Row>
    <Row className='mb-3'>
        <Form.Group as={Col} sm='3' controlId='validationCustom01'>
            <Form.Label>Packaging Type</Form.Label>
            <Form.Control value={itemPackaging} onChange={e => setItemPackaging(e.target.value)} required className='formInput' type='text' placeholder="E.g.., box, pallet, container"/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} sm="3" controlId="validationCustom02">
            <Form.Label> Item Value</Form.Label>
            <Form.Control value={itemValue} onChange={e => setItemValue(e.target.value)}  required className='formInput' type="text" placeholder=""/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} sm='3' controlId='validationCustom01'>
            <Form.Label>Special Handling Instructions</Form.Label>
            <Form.Control value={itemHandling} onChange={e => setItemHandling(e.target.value)} required className='formInput' type='text' placeholder="Special Handling Instructions"/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} sm="3" controlId="validationCustom02">
            <Form.Label> Storage Location</Form.Label>
            <Form.Control value={itemStorage} onChange={e => setItemStorage(e.target.value)} required className='formInput' type="text" placeholder="E.g Shelf Number, Rack Number, Aisle Number, Bin Number"/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
    </Row>
    <Row className='mb-3'>
        <Form.Group as={Col} sm='3' controlId='validationCustom01'>
            <Form.Label>Date of Exit</Form.Label>
            <Form.Control value={exitDate} min={new Date().toLocaleDateString()} onChange={e => setExitDate(e.target.value)} required className='formInput' type='date' placeholder="Date of Exit"/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} sm="3" controlId="validationCustom02">
            <Form.Label> Customer Name</Form.Label>
            <Form.Control value={customerName} onChange={e => setCustomerName(e.target.value)}  required className='formInput' type="text" placeholder="Customer Name"/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} sm='3' controlId='validationCustom01'>
            <Form.Label>Customer Email</Form.Label>
            <Form.Control value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} required className='formInput' type='text' placeholder="Customer Email"/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} sm="3" controlId="validationCustom02">
            <Form.Label> Customer Phone Number</Form.Label>
            <Form.Control value={customerMobile} onChange={e => setCustomerMobile(e.target.value)} required className='formInput' type="text" placeholder="Customer Phone Number"/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
    </Row>
    <Form.Group as={Col} sm='3' className='my-3' controlId='validationCustom01'>
            <Form.Label>Service Price</Form.Label>
            <Form.Control value={price} onChange={e => setPrice(e.target.value)} required className='formInput' type='text' placeholder="Service Price"/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Button variant="success" type='submit'>
          Add Inventory
        </Button>
      </Form>
    </Container>
         </div>
    </div>
  )
}

export default Warehouse