import { useContext, useState } from 'react';
import { AppContext } from '../../AppContextProvider';

const AddProduct = () => {
  const value=useContext(AppContext)
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");
  const [taxCategory, setTaxCategory] = useState(null);
  const [purchasePriceExclTax, setPurchasePriceExclTax] = useState("");
  const [purchasePriceInclTax, setPurchasePriceInclTax] = useState("");
  const [sellingPriceExclTax, setSellingPriceExclTax] = useState("");
  const [sellingPriceInclTax, setSellingPriceInclTax] = useState("");
  const [openingStock, setOpeningStock] = useState(0);
  const [taxMultiplier,setTaxMultiplier]=useState(null)
  // Handler for adding a new feature
  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature]);
      setNewFeature("");
    }
  };

  //submit product function
  function addProductFn(e){
    e.preventDefault()
    const productData={
        "name":productName,
        "category_id":category,
        "description":description,
        "features":features,
        "purchase_price":purchasePriceInclTax,
        "selling_price":sellingPriceInclTax,
        "quantity":openingStock,
        "tax_id":taxCategory
    }
    console.log(productData)
  }

  //function to handle changes in price and tax category together with its assist functions
  function handlePriceTax(value1,constant){
    function purchasePriceExclTaxFn(){
      if(taxCategory==='' || !taxCategory){
        setPurchasePriceInclTax(value1)
      }else{
        let taxMultiplier1=1+taxMultiplier/100
        let price=(value1*taxMultiplier1).toFixed(2)
        setPurchasePriceInclTax(parseFloat(price))
      }
    }
    function purchasePriceInclTaxFn(){
      if(taxCategory==="" || !taxCategory){
        setPurchasePriceExclTax(value1)
      }else{
        let taxMultiplier1=1+taxMultiplier/100
        let price=(value1/taxMultiplier1).toFixed(2)
        setPurchasePriceExclTax(parseFloat(price))
      }
    }
    function sellingPriceExclTaxFn(){
      if(taxCategory==='' || !taxCategory){
        setSellingPriceInclTax(value1)
      }else{
        let taxMultiplier1=1+taxMultiplier/100
        let price=(value1*taxMultiplier1).toFixed(2)
        setSellingPriceInclTax(parseFloat(price))
      }
    }
    function selingPriceInclTaxFn(){
      if(taxCategory==="" || !taxCategory){
        setSellingPriceExclTax(value1)
      }else{
        let taxMultiplier1=1+taxMultiplier/100
        let price=(value1/taxMultiplier1).toFixed(2)
        setSellingPriceExclTax(parseFloat(price))
      }
    }
    function taxCategoryFn(x){
      if(x!=="null" && purchasePriceExclTax!==""){
        let taxMultiplier1=1+x/100
        let price=(purchasePriceExclTax*taxMultiplier1).toFixed(2)
        let price1=(sellingPriceExclTax*taxMultiplier1).toFixed(2)
        setPurchasePriceInclTax(parseFloat(price))
        sellingPriceExclTax!==""?setSellingPriceInclTax(price1):setSellingPriceInclTax(sellingPriceExclTax)
      }else{
        setPurchasePriceInclTax(purchasePriceExclTax)
        setSellingPriceInclTax(sellingPriceExclTax)
      }
    }
    if(constant==="purchasePriceExclTax"){
      setPurchasePriceExclTax(value1)
      purchasePriceExclTaxFn()
    }
    if(constant==="purchasePriceInclTax"){
      setPurchasePriceInclTax(value1)
      purchasePriceInclTaxFn()
    }
    if(constant==="taxCategory"){
      setTaxCategory(value1)
      if(value1===""){setTaxMultiplier(null);taxCategoryFn("null")}
      else{
      const taxArr=value.taxes.filter((item)=>{if( item.id===parseInt(value1)){return item}})[0]
      setTaxMultiplier(taxArr.value);taxCategoryFn(taxArr.value)}
    }
    if(constant==="sellingPriceExclTax" ){
      setSellingPriceExclTax(value1)
      sellingPriceExclTaxFn()
    }
    if(constant==="sellingPriceInclTax"){
      setSellingPriceInclTax(value1)
      selingPriceInclTaxFn()
    }
  }
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <form onSubmit={addProductFn}>
      {/* Product Name and Category */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="flex-1">
  <label className="block font-semibold mb-2">Select Category</label>
  <div className="flex items-center space-x-2">
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="w-full p-2 border rounded-md"
      required
    >
      <option value="">Choose a category</option>
      {value.categories.map((category)=>{
        return (<option key={category.id} value={category.id}>{category.name}</option>)
      })}
      
    </select>
  </div>
</div>

      </div>

      {/* Description and Image Upload */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <label className="block font-semibold mb-2">Product Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md h-24"
            placeholder="Enter product description"
            required
          ></textarea>
        </div>
        <div className="flex-1">
          <label className="block font-semibold mb-2">Product Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-6 flex gap-4">
        <section className='w-1/2'>
        <label className="block font-semibold mb-2">Features</label>
        <div className="flex items-center gap-4 mb-2 ">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Add a feature"
          />
          <button
            onClick={addFeature}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add
          </button>
        </div>
        </section>
        <ul className="space-y-2 mt-2">
          {features.map((feature, index) => (
            <li key={index} className="text-sm text-gray-700">
              - {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Pricing Section */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Pricing</label>
        <div className="flex gap-4 mb-2">
          <div className="flex-1">
            <label className="block font-semibold mb-2">Tax Category</label>
            <select
              value={taxCategory}
              onChange={(e) => handlePriceTax(e.target.value,"taxCategory")}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select tax category</option>
              {value.taxes.map((tax)=>{
                return (
                  <option key={tax.id} value={tax.id}>{tax.name}</option>
                )
              })}
            </select>
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-2">Purchase Price (Excl. Tax)</label>
            <input
              type="number"
              value={purchasePriceExclTax}
              onChange={(e) => handlePriceTax(e.target.value,"purchasePriceExclTax")}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-2">Purchase Price (Incl. Tax)</label>
            <input
              type="number"
              value={purchasePriceInclTax}
              onChange={(e) => handlePriceTax(e.target.value,"purchasePriceInclTax")}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-2">Selling Price (Excl. Tax)</label>
            <input
              type="number"
              value={sellingPriceExclTax}
              onChange={(e) => handlePriceTax(e.target.value,"sellingPriceExclTax")}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-2">Selling Price (Incl. Tax)</label>
            <input
              type="number"
              value={sellingPriceInclTax}
              onChange={(e) => handlePriceTax(e.target.value,"sellingPriceInclTax")}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Opening Stock */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Opening Stock</label>
        <input
          type="number"
          value={openingStock}
          onChange={(e) => setOpeningStock(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter opening stock quantity"
        />
      </div>

      {/* Save/Add Product Button */}
      <button
        type='submit'
        className="bg-green-500 text-white px-6 py-2 rounded-md w-full"
      >
        Save / Add Product
      </button>
      </form>
    </div>
  );
};

export default AddProduct;
