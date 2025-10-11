import { Form } from "./_components/form";
import { FileProvider } from "./_components/file-provider";
import { FileInput } from "./_components/file-input";
import { FileList } from "./_components/file-list";
import { FileOutputList } from "./_components/file-output-list";
import { Button } from "@devup-ui/components";

export default function Home() {
  return (
    <FileProvider>
      <Form>
        <FileInput />
        <Button variant="primary" type="submit">
          변환
        </Button>
        <FileList />
        <FileOutputList />
      </Form>
    </FileProvider>
  );
}
