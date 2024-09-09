package com.example.backend.service.admin.pdf;

import com.example.backend.Repository.DeviRepository;
import com.example.backend.dto.Devidto;
import com.example.backend.model.Devi;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.itextpdf.text.pdf.PdfWriter;


@Service
public class PdfService {

    @Autowired
    DeviRepository deviRepository;

    public Devidto addDevi(Devidto devidto) throws IOException {
        Devi devi = new Devi();
        devi.setId(devidto.getId());
        devi.setDescription(devidto.getDescription());
        devi.setQuantity(devidto.getQuantity());
        devi.setPrice(devidto.getPrice());
        return deviRepository.save(devi).getDto();
    }

    public List<Devidto> getAllDevi(){
        List<Devi> devis = deviRepository.findAll();
        return devis.stream().map(Devi::getDto).collect(Collectors.toList());
    }

    public boolean deletedevi(Long id){
        Optional<Devi> optionalItems= deviRepository.findById(id);
        if(optionalItems.isPresent()){
            deviRepository.deleteById(id);
            return true;
        }else {
            return false;
        }
    }




    public ByteArrayInputStream devisToPdf(List<Devi> devisList) {
        double totalAmount = 0;
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();
            Image logo = Image.getInstance("C:\\Users\\MediaCenter Zaghouan\\Downloads\\Logo_ESPRIT_Ariana.jpg"); // Replace "path/to/logo.png" with the actual path
            logo.setAbsolutePosition(36, 750); // Adjust position
            logo.scalePercent(15); // Adjust scaling to fit your needs
            document.add(logo);

            // Add "Facture" title aligned center
            Paragraph title = new Paragraph("Facture", new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD));
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            // Add the current system date on the right
            Paragraph dateParagraph = new Paragraph(new Date().toString(), new Font(Font.FontFamily.TIMES_ROMAN, 12));
            dateParagraph.setAlignment(Element.ALIGN_RIGHT);
            document.add(dateParagraph);

            document.add(Chunk.NEWLINE);
            document.add(new Paragraph(" ", new Font(Font.FontFamily.TIMES_ROMAN, 100)));


            PdfPTable table = new PdfPTable(4); // Adjust the number of columns based on your Devi object's fields

            table.setWidthPercentage(100);
            table.addCell("Description");
            table.addCell("Quantity");
            table.addCell("Price");
            table.addCell(" Total");

            for (Devi devis : devisList) {
                table.addCell(devis.getDescription());
                table.addCell(String.valueOf(devis.getQuantity()));
                table.addCell(String.valueOf(devis.getPrice()));
                double lineTotal = devis.getPrice() * devis.getQuantity();
                table.addCell(String.format("%.2f", lineTotal));

                totalAmount += lineTotal;
            }


            table.addCell("Total Amount");
            table.addCell("");
            table.addCell("");
            table.addCell(String.format("%.2f", totalAmount));


            document.add(table);

            Paragraph footer = new Paragraph("La Direction Administrative et Financière", new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.ITALIC));
            footer.setAlignment(Element.ALIGN_CENTER);
            document.add(footer);
            PdfPTable signatureTable = new PdfPTable(1);
            signatureTable.setWidthPercentage(50);
            signatureTable.setHorizontalAlignment(Element.ALIGN_RIGHT); // Align Signature area to the right
            // Optional: Adjust cell to meet your design needs
            PdfPCell cell = new PdfPCell(new Phrase("Signature:", new Font(Font.FontFamily.TIMES_ROMAN, 12)));
            cell.setBorder(PdfPCell.NO_BORDER);
            cell.setBorderWidthBottom(1);
            cell.setPaddingBottom(5);
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            signatureTable.addCell(cell);

            // Add some spacing before the signature table
            document.add(new Paragraph(" "));
            document.add(signatureTable);

            document.close();

            document.close();
        } catch (DocumentException ex) {
            // Handle the error
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}
