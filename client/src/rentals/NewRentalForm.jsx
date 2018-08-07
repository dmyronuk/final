import RentalForm from "./RentalForm";
import axios from 'axios';

class NewRentalForm extends RentalForm {
  FORM_TITLE = "New Listing"

  componentDidUpdate(){
    super.componentDidUpdate()
    document.title = `New Listing | Kiro`;
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const token = localStorage.getItem("JWT_TOKEN");
    const { data, imageURLs } = this.state;

    axios.post('/api/listings', {
      data: data,
      images: imageURLs,
      token: token,
    })
    .then(res => {
      (res.status === 200) && this.setState({redirect: true})
    });
  }

}

export default NewRentalForm