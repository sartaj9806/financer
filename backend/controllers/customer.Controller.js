import customerModal from "../models/customer.Model.js"


export const isCustomerLogin = async (req, res) => {
    return res.json({ success: true })
}

export const getAllCustomers = async (req, res) => {
    try {
        const allCustomers = await customerModal.find({ financerId: req.financer._id });

        if (!allCustomers) {
            return res.json({ success: false, message: 'Customer not found' })
        }

        res.json({ success: true, allCustomers })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}

export const getSingleCustomers = async (req, res) => {
    const id = req.params.id;
    try {
        const singleCustomer = await customerModal.findOne({
            _id: id
        });
        if (!singleCustomer) {
            return res.json({ success: false, message: 'Customer not found' })
        }

        res.json({ success: true, singleCustomer })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const customerEmiUpdate = async (req, res) => {
    const { id } = req.params;
    const { newAmount, index } = req.body;

    if (!newAmount) {
        return res.json({ success: false, message: 'Please enter EMI Amount' });
    }

    if (newAmount < 0) {
        return res.json({ success: false, message: 'Amount Cannot be negitive' });
    }

    try {
        const customer = await customerModal.findById(id);
        customer.loanRepayment[index].EMIReceived = newAmount;
        await customer.save();

        res.json({ success: true, message: 'Update Emi', customer })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const customerEmiDelete = async (req, res) => {
    const { id } = req.params;
    const { index } = req.body;
    try {
        const customer = await customerModal.findById(id);
        if (!customer) {
            return res.json({ success: false, message: "Customer not found" });
        }
        customer.loanRepayment.splice(index, 1);
        await customer.save();
        res.json({ success: true, message: 'Emi Entry delete successfully', customer })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const addNewCustomer = async (req, res) => {
    const { name, phone, address, openDate, closeDate, loanAmount, accountNo } = req.body;
    const financerId = req.financer._id

    if (!name || !phone || !openDate || !closeDate || !address || !loanAmount) {
        return res.json({ success: false, message: 'All Fields are required' })
    }

    try {
        const isCustomer = await customerModal.findOne({ accountNo })

        if (isCustomer) {
            return res.json({ success: false, message: 'Use unique Account no' })
        }

        const EMIAmount = loanAmount / 100;
        const withInterest = EMIAmount * 120;


        const newCustomer = new customerModal({
            name, phone, address, openDate, closeDate, loanAmount, accountNo, financerId, EMIAmount, withInterest, balance: withInterest,
        })

        await newCustomer.save();

        res.json({ success: true, message: 'Customer Add successfully', newCustomer })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }


}

export const addAllCustomerEmi = async (req, res) => {
    const allCustomersEmiArray = req.body;

    if (!allCustomersEmiArray || !Array.isArray(allCustomersEmiArray) || allCustomersEmiArray.length === 0) {
        return res.json({ success: false, message: "Invalid EMI data provided" });
    }

    try {
        for (let i = 0; i < allCustomersEmiArray.length; i++) {
            const { customerId, EMIReceived } = allCustomersEmiArray[i];

            const customer = await customerModal.findById(customerId);
            if (!customer) {
                return res.json({ success: false, message: "Customer not found" });
            }

            customer.loanRepayment.push({ EMIReceived });
            await customer.save();
        }
        res.json({ success: true, message: "EMI added successfully for all customers" });
    } catch (error) {
        res.json({ success: false, message: "Internal server error" });
    }
}

export const addSingleCustomerEmi = async (req, res) => {
    const { id } = req.params;
    const { EMIReceived, Date } = req.body;


    if (!EMIReceived || !Date) {
        return res.json({ success: false, message: 'Please Fill Emi Fields' })
    }
    try {
        const customer = await customerModal.findById(id);
        if (!customer) {
            return res.json({ success: false, message: 'Customer not found' })
        }
        customer.loanRepayment.push({ EMIReceived, Date });
        await customer.save();

        res.json({ success: true, message: 'Emi Added successfully', customer })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const updateCustomerProfile = async (req, res) => {
    const { name, phone, address, openDate, closeDate, loanAmount } = req.body;
    const { id } = req.params;

    if (!name || !phone || !address || !openDate || !closeDate || !loanAmount) {
        return res.json({ success: false, message: 'All fields are required' })
    }


    try {
        const customer = await customerModal.findById(id);

        customer.name = name;
        customer.phone = phone;
        customer.address = address;
        customer.loanAmount = loanAmount;
        customer.openDate = openDate;
        customer.closeDate = closeDate;

        await customer.save();

        res.json({ success: true, message: 'Customer update Successfully' })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const deleteCustomerProfile = async (req, res) => {
    const { id } = req.params;

    try {

        const customer = await customerModal.findByIdAndDelete(id);

        if (!customer) {
            return res.json({ success: false, message: 'Customer not found' })
        }

        res.json({ success: true, message: 'Customer deleted successfully' })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

