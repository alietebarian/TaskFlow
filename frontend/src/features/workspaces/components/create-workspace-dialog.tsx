"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useCreateWorkspace } from "../hooks/use-create-workspace";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { CreateWorkspaceFormValues, createWorkspaceSchema } from "../schema/create-workspace-schema";

export function CreateWorkspaceDialog() {
    const [open, setOpen] = useState(false);
    const { mutate, isPending } = useCreateWorkspace();

    const form = useForm<CreateWorkspaceFormValues>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: { name: "" },
    });

    function onSubmit(values: CreateWorkspaceFormValues) {
        mutate(values, {
            onSuccess: () => {
                setOpen(false);
                form.reset();
            },
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Workspace
                </Button>
            </DialogTrigger> */}

            <DialogTrigger className={buttonVariants({ variant: "default" })}>
                <Plus className="mr-2 h-4 w-4" />
                New Workspace
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new workspace</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="My Team Workspace" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "Creating..." : "Create workspace"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}