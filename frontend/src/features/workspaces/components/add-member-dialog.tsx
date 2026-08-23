"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { useAddMember } from "../hooks/use-add-member";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
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
import { AddMemberFormValues, addMemberSchema } from "../schema/add-member-schema";

export function AddMemberDialog({ workspaceId }: { workspaceId: string }) {
    const [open, setOpen] = useState(false);
    const { mutate, isPending } = useAddMember(workspaceId);

    const form = useForm<AddMemberFormValues>({
        resolver: zodResolver(addMemberSchema),
        defaultValues: { email: "" },
    });

    function onSubmit(values: AddMemberFormValues) {
        mutate(values, {
            onSuccess: () => {
                setOpen(false);
                form.reset();
            },
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Member
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite a member</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="teammate@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "Inviting..." : "Invite"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}