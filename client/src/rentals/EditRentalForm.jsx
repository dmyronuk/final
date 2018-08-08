import RentalForm from "./RentalForm";
import { getSingleListing } from "../ajax/listings";
import axios from 'axios';

class EditRentalForm extends RentalForm {
  FORM_TITLE = "Edit Listing"

  async componentDidMount() {
    document.title = `Edit Listing | Kiro`
    super.componentDidMount()
    this.setState({edit: true})
    let listingId = this.props.match.params.id
    let listing = listingId && await getSingleListing(listingId)
    if (listing) {
      let data =  {
        street: listing.street,
        city: listing.city,
        province: listing.province,
        postal_code: listing.postal_code,
        lat: listing.lat,
        lng: listing.lng,
        price: listing.price,
        bedrooms: listing.bedrooms,
        bathrooms: listing.bathrooms,
        date: listing.date_available.slice(0, 10),
        description: listing.description,
      }
      this.setState({
        data: data,
        imageURLs: listing.photos || [],
        // edit: true,
        id: listing.id
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const token = localStorage.getItem("JWT_TOKEN");
    const { data, imageURLs } = this.state;
    axios.patch(`/api/listings/${this.props.match.params.id}`, {
      data: data,
      imageURLs: imageURLs,
      token: token,
    })
    .then(res => {
      if(res.data.errors) {
        this.setState({...this.state, errors: res.data.errors})
        return
      }
      this.setState({redirect: true})
    })
  }
}

export default EditRentalForm