"use client";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Control, useFieldArray, useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

import { subtitle } from "@/components/primitives";
import Logo from "@/public/logo-portal.png";
import PDF from "@/components/PDF";

type FormValues = {
  itemsList: {
    descripcion: string;
    cantidad: number | null;
    precio: number | null;
  }[];
  comprobante: string;
  presupuesto: string;
  fecha: string;
  cliente: string;
  domicilio: string;
  vendedor: string;
  contacto: string;
  IVA: string;
  expediente: string;
  condVenta: string;
};

const defaultDataCliente: Record<string, { domicilio: string }> = {
  "DIRECCION DE MATERIALES Y CONSTRUCCIONES ESCOLARES": {
    domicilio: "DIEGO DE VILLAROEL 339",
  },
  Policia: {
    domicilio: "Calle Falsa 1234",
  },
};

const defaultDataVendedor: Record<string, { contacto: string }> = {
  "PALACIO EZEQUIEL": {
    contacto: "381-5116763",
  },
  "DIP RAMIRO": {
    contacto: "381-4791893",
  },
};

function getTotal(payload: FormValues["itemsList"]) {
  let total = 0;

  for (const item of payload) {
    if (item.precio && item.cantidad) {
      total = total + +item.precio * +item.cantidad;
    }
  }

  return total.toLocaleString("es-ES");
}

function TotalAmout({ control }: { control: Control<FormValues> }) {
  const cartValues = useWatch({
    control,
    name: "itemsList",
  });

  return <Chip>Monto total: ${getTotal(cartValues)}</Chip>;
}

export default function Home() {
  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    formState: { errors },
    watch,
    control,
    reset,
    getValues,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      itemsList: [
        {
          descripcion: "",
          cantidad: 1,
          precio: null,
        },
      ],
      comprobante: "",
      presupuesto: "",
      fecha: today,
      cliente: "",
      domicilio: "",
      vendedor: "",
      contacto: "",
      IVA: "EXENTO",
      expediente: "",
      condVenta: "CTA CTE",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "itemsList",
    control,
    rules: {
      required: "Agrega un item almenos.",
    },
  });

  // const datos = watch();

  // console.log(datos);

  const cliente = watch("cliente");
  const vendedor = watch("vendedor");

  useEffect(() => {
    if (cliente && defaultDataCliente[cliente]) {
      setValue("domicilio", defaultDataCliente[cliente].domicilio);
    }
  }, [cliente, reset, getValues]);

  useEffect(() => {
    if (vendedor && defaultDataVendedor[vendedor]) {
      setValue("contacto", defaultDataVendedor[vendedor].contacto);
    }
  }, [vendedor, reset, getValues]);

  return (
    <section className="flex flex-col justify-center gap-4 py-8 md:py-10">
      <h2 className={subtitle({ class: "mt-4" })}>Datos fijos:</h2>
      <div className="border rounded  w-full flex gap-3 flex-wrap">
        <figure className="w-fit bg-white ">
          <Image
            alt="logo portal informatica"
            className="max-w-sm w-full"
            src={Logo}
          />
        </figure>
        <article className="px-5 py-5">
          <p>C.U.I.T.: 30-71816831-3</p>
          <p>Ing.Bruto: 380620</p>
          <p>Inicio de Act.: 01/08/2023</p>
        </article>
      </div>
      <div className="flex w-full justify-between">
        <h2 className={subtitle({ class: "mt-4" })}>Datos editables:</h2>
        <Button color="warning" onClick={() => reset()}>
          Borrar datos
        </Button>
      </div>

      <form className="border rounded  w-full  p-5 ">
        <div className="flex gap-6 flex-wrap">
          <div className="flex flex-col gap-6">
            <label className="flex flex-col gap-1">
              <span>Comprobante: </span>
              <input
                className="py-1 px-2 border border-gray-500 rounded"
                type="number"
                {...register(`comprobante`, {
                  required: true,
                })}
              />
            </label>

            <label className="flex flex-col gap-1">
              <span>Presupuesto Nº:</span>
              <input
                className="py-1 px-2 border border-gray-500 rounded"
                type="number"
                {...register(`presupuesto`, {
                  required: true,
                })}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span>Fecha:</span>
              <input
                className="py-1 px-2 border border-gray-500 rounded"
                defaultValue={today}
                type="date"
                {...register(`fecha`, {
                  required: true,
                })}
              />
            </label>
          </div>
          <div className="flex flex-col gap-6">
            <label className="flex flex-col gap-1">
              <span>Señor/a: </span>
              <input
                className="py-1 px-2 border border-gray-500 rounded"
                list="clientes"
                {...register(`cliente`, {
                  required: true,
                })}
              />
              <datalist id="clientes">
                <option value="DIRECCION DE MATERIALES Y CONSTRUCCIONES ESCOLARES" />
                <option value="Policia" />
              </datalist>
            </label>
            <label className="flex flex-col gap-1">
              <span>Domicilio:</span>
              <input
                {...register(`domicilio`, {
                  required: true,
                })}
                className="py-1 px-2 border border-gray-500 rounded"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span>Vendedor: </span>
              <input
                className="py-1 px-2 border border-gray-500 rounded"
                list="vendedores"
                {...register(`vendedor`, {
                  required: true,
                })}
              />
              <datalist id="vendedores">
                <option value="PALACIO EZEQUIEL" />
                <option value="DIP RAMIRO" />
              </datalist>
            </label>
            <label className="flex flex-col gap-1">
              <span>Contacto:</span>
              <input
                {...register(`contacto`, {
                  required: true,
                })}
                className="py-1 px-2 border border-gray-500 rounded"
              />
            </label>
          </div>
          <div className="flex flex-col gap-6">
            <label className="flex flex-col gap-1">
              <span>I.V.A.: </span>
              <input
                className="py-1 px-2 border border-gray-500 rounded"
                defaultValue={"EXENTO"}
                {...register(`IVA`, {
                  required: true,
                })}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span>EXPTE. Nº:</span>
              <input
                {...register(`expediente`, {
                  required: true,
                })}
                className="py-1 px-2 border border-gray-500 rounded"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span>Cond. Venta: </span>
              <input
                className="py-1 px-2 border border-gray-500 rounded"
                defaultValue={"CTA CTE"}
                {...register(`condVenta`, {
                  required: true,
                })}
              />
            </label>
          </div>
        </div>
        <hr className="my-5" />
        <div className="flex flex-col gap-6 flex-wrap">
          <h2 className={subtitle()}>Detalle:</h2>

          {fields.map((field, index) => {
            return (
              <div
                key={index}
                className="flex gap-6 flex-wrap border-b-neutral-600 border-b-1 pb-6 "
              >
                <label className="flex flex-col gap-1 flex-1">
                  <span>Descripción: </span>
                  <input
                    className="py-1 px-2 border border-gray-500 rounded"
                    {...register(`itemsList.${index}.descripcion`, {
                      required: true,
                    })}
                  />
                </label>
                <label className="flex flex-col gap-1 shrink-0">
                  <span>Cantidad: </span>
                  <input
                    className="py-1 px-2 border w-20 border-gray-500 rounded"
                    {...register(`itemsList.${index}.cantidad`, {
                      required: true,
                    })}
                    type="number"
                  />
                </label>
                <label className="flex flex-col gap-1 shrink-0">
                  <span>Precio: </span>
                  <input
                    className="py-1 px-2 border w-40 border-gray-500 rounded"
                    min={0}
                    placeholder="0"
                    type="number"
                    {...register(`itemsList.${index}.precio`, {
                      required: true,
                    })}
                  />
                </label>
                <Button
                  className="mt-auto"
                  color="danger"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Borrar
                </Button>
              </div>
            );
          })}
          <TotalAmout control={control} />
          <Button
            type="button"
            onClick={() => {
              append({
                descripcion: "",
                cantidad: 1,
                precio: 0,
              });
            }}
          >
            Agregar item
          </Button>
        </div>
      </form>
      <PDFDownloadLink document={<PDF />} fileName="dsfdsf">
        {({ blob, url, loading, error }) => {
          if (loading) return "Cargando...";
          if (error) return "Error al generar el PDF";
          if (blob) return <Button>Descargar</Button>;
        }}
      </PDFDownloadLink>
    </section>
  );
}