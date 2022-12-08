<template>
    <div>
        <form id="PaymentForm" action="" method="POST">
            <input type="hidden" name="InvoiceID" value="DEMO-12345" />
            <input id="MPXSessionID" type="hidden" name="MPXSessionID" value="aabbccdd-0123-4567-89ef-aabbccddeeff" /> 
            <table>
                <tbody>
                    <tr>
                        <th>Invoice ID:</th> 
                        <td>DEMO-12345</td>
                    </tr> 
                    <tr>
                        <th>Amount Due:</th>
                        <td>$15.00</td> 
                    </tr>
                    <tr>
                        <th>Cardholder Name:</th>
                        <td>
                            <input id="CardholderName" type="text" name="CardholderName" defaultValue="Test Person" />
                        </td>
                    </tr>
                    <tr>
                        <th>Card Number:</th>
                        <td id="CardNumberCell"></td> 
                    </tr>
                    <tr>
                        <th>Expiry Date (MMYY):</th>
                        <td id="ExpiryDateCell"></td> 
                    </tr>
                    <tr>
                        <th>CVV:</th>
                        <td id="CVVCell"></td> 
                    </tr>
                    <tr>
                        <th>Postal Code:</th>
                        <td>
                            <input type="text" name="PostalCode" defaultValue="h0h 0h0" />
                        </td>    
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button type="button" id="ProcessButton">Process Payment</button>
                        </td>
                    </tr>
                </tbody> 
            </table>
        </form>
    </div>
</template>
  
<script setup>
    onMounted(() => {
        // Retrieve Cardholder Name input - it will be provided to init() to copy its style to the MiraPayCapture fields 
        // var fieldStyle = $('input[name="CardholderName"]');
        var fieldStyle = document.getElementById('CardholderName');

        // Setup frameParentMap option with Card Number, Expiry Date, and CVV fields to be placed within table 
        var frameParentMap = {};
        frameParentMap[MiraPayCapture.FRAME_TYPE_CARD_NUMBER] = "CardNumberCell"; 
        frameParentMap[MiraPayCapture.FRAME_TYPE_EXPIRY_DATE] = "ExpiryDateCell";
        frameParentMap[MiraPayCapture.FRAME_TYPE_CVV] = "CVVCell";

        var form = document.getElementById("PaymentForm");
        // TODO: Get the MPXSessionID from the procedure-create serverless functions
        var MPXSessionID = document.getElementById("MPXSessionID").value;
        // var MPXSessionID = 'aabbccdd-0123-4567-89ef-aabbccddeeff';

        // Initialize MiraPay Capture, while setting field styles 
        MiraPayCapture.init({
            sessionID: MPXSessionID, 
            frameParentMap: frameParentMap, 
            fieldStyle: fieldStyle,
            onInit: function(initSuccess) {
                console.log(initSuccess)
                if (initSuccess) {
                    console.log('MiraPay Capture Init Successful'); 
                    form.style.display = 'block'
                } else {
                    console.log('MiraPay Capture Init Failed');
                form.style.display = 'block'
                }
            } 
        });
    })
</script>

<style scoped>
    input[name="CardholderName"] {
        border: 1px solid;
        padding: 2px 3px;
    }
    button {
        margin: 10px;
        padding: 10px 20px;
        background-color: lightgrey;
    }
</style>