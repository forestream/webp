import { Input } from "@devup-ui/react";

function getImage(formData: FormData) {
  const data = Object.fromEntries(formData);
  console.log(data);
}

export default function Home() {
  return (
    <form action={getImage}>
      <Input type="file" multiple accept="image/png, image/jpeg" />
    </form>
  );
}
