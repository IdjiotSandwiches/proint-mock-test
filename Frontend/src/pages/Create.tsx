import { useState } from "react";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { api } from "@/api/client";
import { toast } from "sonner";

interface BookProps {
  title: string;
  description: string;
}

function Create() {
  const navigate = useNavigate();
  const [book, setBook] = useState<BookProps>({
    title: "",
    description: ""
  });

  const insert = async () => {
    try {
      await api.post(`/book`, {
        title: book?.title,
        description: book?.description
      });

      toast.success("Insert success!");

      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error("Failed to insert book!");
    }
  };

  return (
    <>
      <FieldSet className="w-full max-w-xs">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              type="title"
              value={book.title}
              onChange={(e) =>
                setBook({
                  ...book,
                  title: e.target.value,
                })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              value={book.description}
              onChange={(e) =>
                setBook({
                  ...book,
                  description: e.target.value,
                })
              }
            />
          </Field>
          <Field orientation="horizontal">
            <Button onClick={insert}>Create</Button>
            <Button variant="outline" onClick={() => navigate(`/`)}>
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </>
  );
}

export default Create;
