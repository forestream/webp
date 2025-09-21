import { Button } from "@devup-ui/react";
import { Form } from "./_components/Form";
import { FileProvider } from "./_components/FileProvider";
import { FileInput } from "./_components/FileInput";
import { FileList } from "./_components/FileList";
import { FileOutputList } from "./_components/FileOutputList";

export default function Home() {
  return (
    <FileProvider>
      <Form>
        <FileInput />
        <Button type="submit">Submit</Button>
        <FileList />
        <FileOutputList />
      </Form>
    </FileProvider>
  );
}
