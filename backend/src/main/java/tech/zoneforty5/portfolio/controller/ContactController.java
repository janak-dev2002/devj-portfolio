package tech.zoneforty5.portfolio.controller;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.zoneforty5.portfolio.dto.ContactRequest;
import tech.zoneforty5.portfolio.dto.ContactResponse;
import tech.zoneforty5.portfolio.service.ContactService;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ContactResponse submit(@Valid @RequestBody ContactRequest request) {
        return contactService.send(request);
    }
}
