'use server';

import { CreateInvoice, UpdateInvoice } from "./shemas";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { deleteInvoiceById, postInvoice, putInvoiceById } from "./data";



export async function createInvoice(formData: FormData) {
  // const rawFormData = Object.fromEntries(formData.entries())
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
  try {

    await postInvoice({ customer_id: customerId, amount: amountInCents, status, date })
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  try {
    await putInvoiceById({ customer_id: customerId, amount: amountInCents, status, id })
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  throw new Error('Failed to Delete Invoice');

  // try {
  await deleteInvoiceById(id)
  revalidatePath('/dashboard/invoices');
  return { message: 'Deleted Invoice.' };
  // } catch (error) {
  //   return { message: 'Database Error: Failed to Delete Invoice.' };
  // }
}
