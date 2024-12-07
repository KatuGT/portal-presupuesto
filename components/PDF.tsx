"use client";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import LogoPortal from "../public/logo-portal.png";
import { FormValues } from "./utils";

const styles = StyleSheet.create({
  page: {
    marginTop: 100,
  },
  mainContainer: {
    marginHorizontal: "auto",
    width: "90%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    columnGap: 10,
  },
  headerImage: {
    height: "auto",
    width: "45%",
    objectFit: "contain",
  },
  headerData: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
  },
  textSize: {
    fontSize: 9,
    fontWeight: 500,
  },
  textContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-around",
  },
  datoHeader: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  middelSection: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    marginTop: 30,
  },
});

const PDF = ({
  itemsList: [{ descripcion, cantidad, precio }],
  comprobante = "",
  presupuesto,
  fecha,
  cliente,
  domicilio,
  vendedor,
  contacto,
  IVA,
  expediente,
  condVenta,
}: FormValues) => {
  const [year, month, day] = fecha.split("-");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <Image src="./logo-portal.png" style={styles.headerImage} />
            <View style={styles.headerData}>
              <View
                style={[
                  styles.textContainer,
                  {
                    borderRightColor: "black",
                    borderRightStyle: "solid",
                    borderRightWidth: 1,
                    flex: 1,
                  },
                ]}
              >
                <Text style={styles.textSize}>C.U.I.T.: 30-71816831-3</Text>
                <Text style={styles.textSize}>Ing.Bruto: 380620</Text>
                <Text style={styles.textSize}>Inicio de Act.: 01/08/2023</Text>
              </View>
              <View
                style={[
                  {
                    borderRightColor: "black",
                    borderRightStyle: "solid",
                    borderRightWidth: 1,
                    flex: 0.7,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                  },
                ]}
              >
                <Image
                  src="./x.png"
                  style={{
                    height: 30,
                    width: 30,
                    objectFit: "contain",
                    borderWidth: 1,
                    borderColor: "black",
                    borderStyle: "solid",
                    padding: 5,
                  }}
                />
                <Text
                  style={[
                    {
                      textAlign: "center",
                      marginHorizontal: "auto",
                      fontSize: 6,
                    },
                  ]}
                >
                  DOCUMENTO NO VALIDO COMO FACTURA
                </Text>
              </View>
              <View
                style={[styles.textContainer, { flex: 1, textAlign: "right" }]}
              >
                <View style={styles.datoHeader}>
                  <Text style={[styles.textSize, { flex: 1 }]}>
                    Comprobante:
                  </Text>
                  <Text
                    style={[
                      styles.textSize,
                      { flex: 0.8, textAlign: "left", marginLeft: 3 },
                    ]}
                  >
                    {comprobante}
                  </Text>
                </View>

                <View style={styles.datoHeader}>
                  <Text style={[styles.textSize, { flex: 1 }]}>
                    Presupuesto Nº:
                  </Text>
                  <Text
                    style={[
                      styles.textSize,
                      { flex: 0.8, textAlign: "left", marginLeft: 3 },
                    ]}
                  >
                    {presupuesto}
                  </Text>
                </View>
                <View style={styles.datoHeader}>
                  <Text style={[styles.textSize, { flex: 1 }]}>Fecha:</Text>
                  <Text
                    style={[
                      styles.textSize,
                      { flex: 0.8, textAlign: "left", marginLeft: 3 },
                    ]}
                  >
                    {`${day}/${month}/${year}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.middelSection}>
            <View
              style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRightColor: "black",
                borderRightStyle: "solid",
                borderRightWidth: 1,
                flex: 2,
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <View style={styles.datoHeader}>
                <Text style={[styles.textSize, { textAlign: "right" }]}>
                  Señor/a:
                </Text>
                <Text
                  style={[
                    styles.textSize,
                    { flex: 1, textAlign: "left", marginLeft: 3 },
                  ]}
                >
                  {cliente}
                </Text>
              </View>
              <View style={styles.datoHeader}>
                <Text style={[styles.textSize, { textAlign: "right" }]}>
                  Domicilio:
                </Text>
                <Text
                  style={[
                    styles.textSize,
                    { flex: 1, textAlign: "left", marginLeft: 3 },
                  ]}
                >
                  {domicilio}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <View style={styles.datoHeader}>
                  <Text style={[styles.textSize, {}]}>Vendedor:</Text>
                  <Text
                    style={[
                      styles.textSize,
                      { flex: 0.8, textAlign: "left", marginLeft: 3 },
                    ]}
                  >
                    {vendedor}
                  </Text>
                </View>
                <View style={styles.datoHeader}>
                  <Text style={[styles.textSize, { flex: 1 }]}>Contacto:</Text>
                  <Text
                    style={[
                      styles.textSize,
                      { flex: 0.8, textAlign: "left", marginLeft: 3 },
                    ]}
                  >
                    {contacto}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.datoHeader}>
                <Text style={[styles.textSize, { flex: 1 }]}>I.V.A.:</Text>
                <Text
                  style={[
                    styles.textSize,
                    { flex: 0.8, textAlign: "left", marginLeft: 3 },
                  ]}
                >
                  {IVA}
                </Text>
              </View>
              <View style={styles.datoHeader}>
                <Text style={[styles.textSize, { flex: 1 }]}>EXPTE. Nº :</Text>
                <Text
                  style={[
                    styles.textSize,
                    { flex: 0.8, textAlign: "left", marginLeft: 3 },
                  ]}
                >
                  {expediente}
                </Text>
              </View>
              <View style={styles.datoHeader}>
                <Text style={[styles.textSize, { flex: 1 }]}>Cond. Venta:</Text>
                <Text
                  style={[
                    styles.textSize,
                    { flex: 0.8, textAlign: "left", marginLeft: 3 },
                  ]}
                >
                  {condVenta}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDF;
