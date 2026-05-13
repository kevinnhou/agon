"use client";

import { api } from "@agon/backend/convex/_generated/api";
import { Button } from "@agon/ui/components/button";
import {
	Field,
	FieldContent,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@agon/ui/components/field";
import { Input } from "@agon/ui/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { PaperBackground } from "@/components/paper-background";
import { toast } from "@/lib/toast";

const waitlistFormSchema = z.object({
	email: z.string().trim().email({ message: "Please enter a valid email." }),
	name: z.string().trim().optional(),
});

type WaitlistFormValues = z.infer<typeof waitlistFormSchema>;

export function Waitlist() {
	const form = useForm<WaitlistFormValues>({
		resolver: zodResolver(waitlistFormSchema),
		defaultValues: {
			email: "",
			name: "",
		},
	});

	const joinWaitlist = useMutation(api.waitlist.join);

	async function onSubmit(data: WaitlistFormValues) {
		try {
			await joinWaitlist({
				email: data.email,
				name: data.name?.trim() ? data.name.trim() : undefined,
			});
			form.reset();
			toast.success("You're on the list!");
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Something went wrong.";
			toast.error(message);
		}
	}

	return (
		<div className="select-none font-mono">
			<PaperBackground />
			<div className="relative z-10 flex min-h-svh flex-col">
				<div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
					<div className="w-full max-w-xs">
						<h1 className="text-center text-muted-foreground text-xl uppercase tracking-[0.35em]">
							Waitlist
						</h1>

						<form
							className="mt-10 flex flex-col gap-5"
							noValidate
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<FieldGroup className="gap-5">
								<Controller
									control={form.control}
									name="email"
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel className="text-muted-foreground text-xs">
												Email
											</FieldLabel>
											<FieldContent>
												<Input
													{...field}
													aria-invalid={fieldState.invalid}
													autoComplete="email"
													className="h-9 border-border bg-card/95 py-2 text-foreground text-xs shadow-sm backdrop-blur-sm placeholder:text-muted-foreground focus-visible:border-ring"
													id="waitlist-email"
													placeholder="you@example.com"
													type="email"
												/>
												{fieldState.invalid ? (
													<FieldError errors={[fieldState.error]} />
												) : null}
											</FieldContent>
										</Field>
									)}
								/>

								<Controller
									control={form.control}
									name="name"
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel className="text-muted-foreground text-xs">
												Name
											</FieldLabel>
											<FieldContent>
												<Input
													{...field}
													aria-invalid={fieldState.invalid}
													autoComplete="name"
													className="h-9 border-border bg-card/95 py-2 text-foreground text-xs shadow-sm backdrop-blur-sm placeholder:text-muted-foreground focus-visible:border-ring"
													id="waitlist-name"
													placeholder="optional"
													type="text"
												/>
												{fieldState.invalid ? (
													<FieldError errors={[fieldState.error]} />
												) : null}
											</FieldContent>
										</Field>
									)}
								/>
							</FieldGroup>

							<Button
								className="mt-1 h-9 w-full border-border bg-card/90 text-foreground text-xs hover:bg-muted/60"
								disabled={form.formState.isSubmitting}
								size="lg"
								type="submit"
								variant="outline"
							>
								{form.formState.isSubmitting ? "…" : "join"}
							</Button>
						</form>

						<p className="mt-14 text-center font-bold text-[0.6rem] text-muted-foreground uppercase italic tracking-widest">
							agon
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
