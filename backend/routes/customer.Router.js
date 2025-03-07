import express from 'express';
import { addAllCustomerEmi, addNewCustomer, addSingleCustomerEmi, customerEmiDelete, customerEmiUpdate, deleteCustomerProfile, getAllCustomers, getSingleCustomers, isCustomerLogin, isDefaulterCustomer, updateCustomerProfile } from '../controllers/customer.Controller.js';
import { authorized } from '../middleware/authorized.js';

const router = express.Router();


router.get('/is-customer-login', authorized, isCustomerLogin )
router.get('/get-all-customer', authorized, getAllCustomers)
router.get('/get-single-customer/:id', authorized, getSingleCustomers)
router.put('/customer-emi-update/:id', authorized, customerEmiUpdate)
router.delete('/customer-emi-delete/:id', authorized, customerEmiDelete)
router.post('/add-new-customer', authorized, addNewCustomer)
router.put('/add-all-customer-emi', authorized, addAllCustomerEmi)
router.put('/add-single-customer-emi/:id', authorized, addSingleCustomerEmi)
router.put('/update-customer-profile/:id', authorized, updateCustomerProfile)
router.delete('/delete-customer-profile/:id', authorized, deleteCustomerProfile)
router.put('/is-defaulter-customer/:id', authorized, isDefaulterCustomer)


export default router; 