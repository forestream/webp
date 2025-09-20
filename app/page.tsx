import { Button, Input } from "@devup-ui/react";
import { getImage } from "@/actions";

export default function Home() {
  return (
    <form action={getImage}>
      <Input type="file" multiple name="image" accept="image/png, image/jpeg" />
      <Button type="submit">Submit</Button>
    </form>
  );
}
