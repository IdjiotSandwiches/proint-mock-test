import { api } from "@/api/client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { convertDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BookProps {
  id: string;
  code: string;
  title: string;
  description: string;
  createdDate: string;
}

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<BookProps>();

  useEffect(() => {
    const fetch = async () => {
      try {
        const book = await api.get(`/book/${id}`);
        setBook(book.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load book details!");
      }
    };

    fetch();
  }, []);

  const update = async () => {
    try {
      await api.put(`/book/${id}`, {
        title: book?.title,
        description: book?.description
      });

      toast.success("Update success!");

      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error("Failed to update book!");
    }
  };

  return (
    <>
      {book && (
        <FieldSet className="w-full max-w-xs">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="id">Id</FieldLabel>
              <Input id="id" type="text" placeholder={book.id} disabled />
            </Field>
            <Field>
              <FieldLabel htmlFor="code">Code</FieldLabel>
              <Input id="code" type="code" placeholder={book.code} disabled />
            </Field>
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
            <Field>
              <FieldLabel htmlFor="createdDate">Created Date</FieldLabel>
              <Input
                id="createdDate"
                type="createdDate"
                placeholder={convertDate(book.createdDate)}
                disabled
              />
            </Field>
            <Field orientation="horizontal">
              <Button onClick={update}>Update</Button>
              <Button variant="outline" onClick={() => navigate(`/`)}>Cancel</Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      )}
    </>
  );
}

export default Update;
