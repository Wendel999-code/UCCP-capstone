// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { useState } from "react";

// export default function CertificatePreview({ reqId }: { reqId: string }) {
//   const [open, setOpen] = useState(false);

//   // const RenderField = ({
//   //   label,
//   //   value,
//   // }: {
//   //   label: string;
//   //   value?: string | number;
//   // }) => (
//   //   <div>
//   //     <Label className="text-xs text-gray-600">{label}</Label>
//   //     {isFetching ? (
//   //       <Skeleton className="h-9 mt-1 rounded-md" />
//   //     ) : (
//   //       <Input readOnly value={String(value ?? "")} />
//   //     )}
//   //   </div>
//   // );

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button
//           variant="outline"
//           className="text-blue-500 border-none w-full text-left cursor-pointer"
//         >
//           Generate Certificate
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-lg w-full bg-amber-50 dark:bg-zinc-900 rounded-xl">
//         <DialogHeader>
//           <DialogTitle className="text-red-900 dark:text-amber-400 text-2xl font-bold text-center">
//             Baptismal Certificate
//           </DialogTitle>
//         </DialogHeader>

//         {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
//           <RenderField label="First Name" value={member.firstName} />
//           <RenderField label="Last Name" value={member?.lastName} />
//           <RenderField label="Date of Birth" value={member?.date_of_birth} />
//           <RenderField label="Place of Baptism" value={member?.address} />
//           <RenderField
//             label="Officiant"
//             value={member?.Baptismal_Record?.officiant}
//           />
//           <RenderField
//             label="Date of Baptism"
//             value={member?.Baptismal_Record?.baptism_date}
//           />
//         </div> */}
//       </DialogContent>
//     </Dialog>
//   );
// }
