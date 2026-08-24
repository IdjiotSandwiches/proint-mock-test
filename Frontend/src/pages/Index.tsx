import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { api } from "@/api/client";
import { convertDate } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BookProps {
  id: string;
  code: string;
  title: string;
  description: string;
  createdDate: string;
}

function Index() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<BookProps[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const books = await api.get(`/book`);
        setBooks(books.data);
      } catch (error) {
        console.log(error);
        toast.error("");
      }
    };

    fetch();
  }, []);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">No</TableHead>
            <TableHead>Code</TableHead>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Created Date</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.length > 0 ? (
            books.map((b, i) => (
              <TableRow key={b.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell className="font-medium">{b.code}</TableCell>
                <TableCell className="text-center">{b.title}</TableCell>
                <TableCell className="text-center">
                  {convertDate(b.createdDate)}
                </TableCell>
                <TableCell className="text-center space-x-2">
                  <Button variant="default" onClick={() => navigate(`/update/${b.id}`)}>Update</Button>
                  <Button variant="destructive">Delete</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell rowSpan={4}>No book has been registered.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default Index;
