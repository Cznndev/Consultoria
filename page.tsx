"use client"
import dynamic from "next/dynamic"
import { redirect } from "next/navigation"

// Dynamically import the mermaid component to avoid SSR issues
const Mermaid = dynamic(() => import("../components/mermaid"), { ssr: false })

export default function Home() {
  redirect("/dashboard")
}

// export default function ClassDiagramViewer() {
//   const [zoom, setZoom] = useState(1)
//   const [copied, setCopied] = useState(false)

//   // Sample class diagram in mermaid syntax
//   const ecommerceDiagram = `
//     classDiagram
//       class User {
//         +String id
//         +String name
//         +String email
//         +String password
//         +register()
//         +login()
//         +updateProfile()
//       }

//       class Product {
//         +String id
//         +String name
//         +String description
//         +Number price
//         +Number stock
//         +getDetails()
//         +updateStock()
//       }

//       class Order {
//         +String id
//         +Date orderDate
//         +String status
//         +Number totalAmount
//         +processOrder()
//         +cancelOrder()
//         +getOrderDetails()
//       }

//       class OrderItem {
//         +String id
//         +Number quantity
//         +Number price
//         +calculateSubtotal()
//       }

//       class ShoppingCart {
//         +String id
//         +Number totalItems
//         +Number totalAmount
//         +addItem()
//         +removeItem()
//         +checkout()
//       }

//       User "1" -- "many" Order : places
//       Order "1" *-- "many" OrderItem : contains
//       OrderItem "many" -- "1" Product : references
//       User "1" -- "1" ShoppingCart : has
//       ShoppingCart "1" -- "many" Product : contains
//   `

//   const bankingDiagram = `
//     classDiagram
//       class Account {
//         +String accountNumber
//         +String accountType
//         +Number balance
//         +deposit()
//         +withdraw()
//         +getBalance()
//       }

//       class Customer {
//         +String id
//         +String name
//         +String address
//         +String phoneNumber
//         +addAccount()
//         +removeAccount()
//         +updateProfile()
//       }

//       class Transaction {
//         +String id
//         +Date date
//         +String type
//         +Number amount
//         +String description
//         +processTransaction()
//         +cancelTransaction()
//       }

//       class Bank {
//         +String name
//         +String branchCode
//         +addCustomer()
//         +removeCustomer()
//         +generateReports()
//       }

//       class Loan {
//         +String id
//         +Number amount
//         +Number interestRate
//         +Date startDate
//         +Date endDate
//         +approve()
//         +reject()
//         +calculateInterest()
//       }

//       Customer "1" -- "many" Account : owns
//       Account "1" -- "many" Transaction : has
//       Bank "1" -- "many" Customer : serves
//       Customer "1" -- "many" Loan : applies for
//       Bank "1" -- "many" Loan : provides
//   `

//   const copyDiagram = (diagram) => {
//     navigator.clipboard.writeText(diagram)
//     setCopied(true)
//     setTimeout(() => setCopied(false), 2000)
//   }

//   const downloadDiagram = () => {
//     // This is a placeholder. In a real app, you would generate and download an image
//     alert("Em uma aplicação real, isso baixaria o diagrama como uma imagem.")
//   }

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Visualizador de Diagrama de Classes</h1>

//       <Tabs defaultValue="ecommerce" className="w-full">
//         <div className="flex justify-between items-center mb-4">
//           <TabsList>
//             <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
//             <TabsTrigger value="banking">Sistema Bancário</TabsTrigger>
//           </TabsList>

//           <div className="flex gap-2">
//             <Button variant="outline" size="icon" onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.1))}>
//               <ZoomOut className="h-4 w-4" />
//             </Button>
//             <Button variant="outline" size="icon" onClick={() => setZoom((prev) => Math.min(2, prev + 0.1))}>
//               <ZoomIn className="h-4 w-4" />
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => copyDiagram(ecommerceDiagram)}
//               className={copied ? "bg-green-100" : ""}
//             >
//               <Clipboard className="h-4 w-4" />
//             </Button>
//             <Button variant="outline" size="icon" onClick={downloadDiagram}>
//               <Download className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle>Diagrama de Classes</CardTitle>
//             <CardDescription>Visualização da estrutura do sistema</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div
//               style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
//               className="transition-transform duration-200"
//             >
//               <TabsContent value="ecommerce" className="mt-0">
//                 <Mermaid chart={ecommerceDiagram} />
//               </TabsContent>
//               <TabsContent value="banking" className="mt-0">
//                 <Mermaid chart={bankingDiagram} />
//               </TabsContent>
//             </div>
//           </CardContent>
//         </Card>
//       </Tabs>

//       <Card className="mt-8">
//         <CardHeader>
//           <CardTitle>Sobre Diagramas de Classes</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-muted-foreground">
//             Os diagramas de classes são uma parte fundamental da modelagem orientada a objetos. Eles mostram a estrutura
//             estática de um sistema, incluindo as classes, seus atributos, métodos e os relacionamentos entre as classes.
//             São utilizados para:
//           </p>
//           <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
//             <li>Visualizar as classes e relacionamentos em um sistema</li>
//             <li>Modelar a estrutura de dados de aplicações</li>
//             <li>Comunicar o design do sistema entre desenvolvedores</li>
//             <li>Servir como base para a implementação do código</li>
//             <li>Documentar a arquitetura do sistema</li>
//           </ul>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
