import { saveAs } from 'file-saver'
import { Document, Packer, Paragraph, TextRun } from 'docx'

interface MissionItem {
  time: string
  message: string
}
interface GenDocParam {
  title?: string
  sList: MissionItem[]
  dList: MissionItem[]
}
const genDoc = (opt: GenDocParam) => {
  const { sList, dList } = opt
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          ...sList.map((_) => {
            return new Paragraph({
              children: [
                new TextRun(`T0+${_.time}ms :`),
                new TextRun(_.message)
              ]
            })
          }),
          ...dList.map((_) => {
            return new Paragraph({
              children: [
                new TextRun(`T0+${_.time}ms :`),
                new TextRun(_.message)
              ]
            })
          })
          // new Paragraph({
          //   children: [
          //     new TextRun('Hello World')
          //     // new TextRun({
          //     //   text: 'Foo Bar',
          //     //   bold: true
          //     // }),
          //     // new TextRun({
          //     //   text: '\tGithub is the best',
          //     //   bold: true
          //     // })
          //   ]
          // }),
          // new Paragraph({
          //   children: [new TextRun('Hello World')]
          // })
        ]
      }
    ]
  })

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, 'plan.docx')
  })
}

export default genDoc
