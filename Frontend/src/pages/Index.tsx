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
import { Plus } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BookProps {
  id: string;
  code: string;
  title: string;
  description: string;
  createdDate: string;
}

interface PaginationProps {
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}

function Index() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<BookProps[]>([]);
  const [pagination, setPagination] = useState<PaginationProps>({
    page: 1,
    size: 10,
    totalItems: 0,
    totalPages: 0,
  });

  const fetch = async (page: number = 1) => {
    try {
      const books = await api.get(`/book?page=${page}`);
      console.log(books.data);
      setBooks(books.data.data);
      setPagination({
        page: books.data.page,
        size: books.data.size,
        totalItems: books.data.totalItems,
        totalPages: books.data.totalPages,
      });
    } catch (error) {
      console.log(error);
      toast.error("");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const remove = async (id: string) => {
    try {
      await api.delete(`/book/${id}`);
      toast.success("Delete success!");
      fetch();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete book!");
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">Books</h2>
        <Button onClick={() => navigate("/create")}>
          <Plus /> Create
        </Button>
      </div>
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
                <TableCell>{(pagination.page - 1) * pagination.size + i + 1}</TableCell>
                <TableCell className="font-medium">{b.code}</TableCell>
                <TableCell className="text-center">{b.title}</TableCell>
                <TableCell className="text-center">
                  {convertDate(b.createdDate)}
                </TableCell>
                <TableCell className="text-center space-x-2">
                  <Button
                    variant="default"
                    onClick={() => navigate(`/update/${b.id}`)}
                  >
                    Update
                  </Button>
                  <Button variant="destructive" onClick={() => remove(b.id)}>
                    Delete
                  </Button>
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className={
                pagination.page <= 1
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
              onClick={(e) => {
                e.preventDefault();

                if (pagination.page > 1) {
                  fetch(pagination.page - 1);
                }
              }}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              className={
                pagination.page >= pagination.totalPages
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
              onClick={(e) => {
                e.preventDefault();

                if (pagination.page < pagination.totalPages) {
                  fetch(pagination.page + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

export default Index;
