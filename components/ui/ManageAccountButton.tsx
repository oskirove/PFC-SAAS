import { generatePortalLink } from "@/actions/generatePortalLink";

function ManageAccountButton() {
  return <form action={generatePortalLink}>
    <button type="submit">Gestionar Plan</button>
  </form>;
}

export default ManageAccountButton