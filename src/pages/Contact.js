import { useLocation } from "react-router-dom";
import '../App.css'

export default function Contact() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const name = queryParams.get("name");

  // Contact details for Mario & Luigi
  const contacts = {
    mario: {
      email: "mario@superbros.com",
      phone: "+1-555-MARIO",
      address: "123 Mushroom Kingdom Ave, World 1-1",
    },
    luigi: {
      email: "luigi@superbros.com",
      phone: "+1-555-LUIGI",
      address: "456 Luigi's Mansion, Haunted Hills",
    },
  };

  // Normalize input name for comparison
  const contactInfo = contacts[name?.toLowerCase()] || {
    email: "support@superbros.com",
    phone: "+1-555-HELP-ME",
    address: "Toad Town, Mushroom Kingdom",
  };

  return (
    <div>
      <h2>Hey, Contact Us</h2>
      <p>If you need assistance, feel free to reach out.</p>
      <ul>
        <li><strong>Email:</strong> {contactInfo.email}</li>
        <li><strong>Phone:</strong> {contactInfo.phone}</li>
        <li><strong>Address:</strong> {contactInfo.address}</li>
      </ul>
    </div>
  );
}