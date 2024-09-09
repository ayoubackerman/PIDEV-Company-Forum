package com.example.backend.controller;

import com.example.backend.model.Product;
import com.example.backend.service.Keycloak.KeycloakService;
import com.example.backend.service.ProductService;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
public class KeycloakController {

    @Autowired
    KeycloakService keycloakService;
    @Autowired
    private ProductService productService;
    @Autowired
    private Keycloak keycloak;

    @RequestMapping("/products")
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    @RequestMapping("/liste-users")
    public List<UserRepresentation> getUserList() {
        RealmResource realmResource = keycloak.realm("Pi-Dev");
        return realmResource.users().list();
    }

    @RequestMapping("/liste-roles")
    public List<RoleRepresentation> getRoles() {
        RealmResource realmResource = keycloak.realm("Pi-Dev");
        return realmResource.roles().list();
    }

    @RequestMapping("/liste-RolesNames")
    public List<String> getRealmRoleNames() {
        List<RoleRepresentation> roles = keycloak.realm("Pi-Dev").roles().list();
        return roles.stream()
                .map(RoleRepresentation::getName)
                .collect(Collectors.toList());
    }


    @RequestMapping("/users/roles/{username}")
    public List<String> getUserRoles(@PathVariable String username) {
        List<String> roles = new ArrayList<>();
        RealmResource realm = keycloak.realm("Pi-Dev");
        UsersResource users = realm.users();
        List<UserRepresentation> userRepresentations = users.search(username, 0, 1);
        if (userRepresentations.size() == 1) {
            UserResource user = users.get(userRepresentations.get(0).getId());
            List<RoleRepresentation> roleRepresentations = user.roles().realmLevel().listEffective();
            for (RoleRepresentation role : roleRepresentations) {
                roles.add(role.getName());
            }
        }
        return roles;
    }

    @GetMapping("/rolesName")
    public List<String> getRolesNames() {
        RealmResource realmResource = keycloak.realm("Pi-Dev");
        List<RoleRepresentation> roles = realmResource.roles().list();
        return roles.stream().map(RoleRepresentation::getName).collect(Collectors.toList());
    }

    @PostMapping("/add-role-to-user")
    public ResponseEntity<String> addRoleToUser(@RequestBody Map<String, String> roleData) {
        String roleName = roleData.get("roleName");
        String username = roleData.get("username");
        if (roleName == null || roleName.isEmpty() || username == null || username.isEmpty()) {
            return ResponseEntity.badRequest().body("Role name and username must be provided");
        }
        try {
            RoleRepresentation role = keycloak.realm("Pi-Dev").roles().get(roleName).toRepresentation();
            UserRepresentation user = keycloak.realm("Pi-Dev").users().search(username).get(0);
            keycloak.realm("Pi-Dev").users().get(user.getId()).roles().realmLevel().add(Collections.singletonList(role));
            return ResponseEntity.status(HttpStatus.OK).body("Role Added To User");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error adding role to user: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete-role-from-user")
    public ResponseEntity<String> deleteRoleFromUser(@RequestBody final Map<String, String> roleData) {
        String roleName = roleData.get("roleName");
        String username = roleData.get("username");

        if (roleName == null || roleName.isEmpty() || username == null || username.isEmpty()) {
            return ResponseEntity.badRequest().body("Role name and username must be provided");
        }

        try {
            RoleRepresentation role = keycloak.realm("Pi-Dev").roles().get(roleName).toRepresentation();
            UserRepresentation user = keycloak.realm("Pi-Dev").users().search(username).get(0);
            keycloak.realm("Pi-Dev").users().get(user.getId()).roles().realmLevel().remove(Collections.singletonList(role));
            return ResponseEntity.ok("Role removed from user successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error removing role from user: " + e.getMessage());
        }
    }

    @GetMapping("/role/{roleName}")
    public ResponseEntity<String> getRoleId(@PathVariable String roleName) {
        try {
            RoleRepresentation role = keycloak.realm("Pi-Dev").roles().get(roleName).toRepresentation();
            if (role != null) {
                String roleId = role.getId();
                return ResponseEntity.ok(roleId);
            } else {
                throw new RuntimeException("Role not found: " + roleName);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error getting role ID: " + e.getMessage());
        }
    }

    @PostMapping("/users/{userId}/reset-password")
    public void addUserPassword(@PathVariable String userId, @RequestBody String password) {
        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue(password);
        credential.setTemporary(false);

        keycloak.realm("Pi-Dev").users().get(userId).resetPassword(credential);
    }

    @PutMapping("/users/{userId}/disable")
    public void disableUser(@PathVariable String userId) {
        UserResource userResource = keycloak.realm("Pi-Dev").users().get(userId);
        UserRepresentation user = userResource.toRepresentation();
        user.setEnabled(false);
        userResource.update(user);
    }

    @PutMapping("/users/{userId}/enable")
    public void enableUser(@PathVariable String userId) {
        UserResource userResource = keycloak.realm("Pi-Dev").users().get(userId);
        UserRepresentation user = userResource.toRepresentation();
        user.setEnabled(true);
        //user.setTotp(true);
        userResource.update(user);
    }

    @GetMapping("/roles/{roleId}")
    public ResponseEntity<RoleRepresentation> getRoleById(@PathVariable String roleId) {
        try {
            // RoleResource roleResource = keycloak.realm("google").rolesById().get(roleId);
            RoleRepresentation role = keycloak.realm("Pi-Dev").rolesById().getRole(roleId);
            if (role != null) {
                return ResponseEntity.ok(role);
            } else {
                System.out.println("Role not found");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @DeleteMapping("/{username}/roles/{roleName}")
    public ResponseEntity<?> removeRoleFromUser(
            @PathVariable String username,
            @PathVariable String roleName) {

        try {
            keycloakService.removeRoleFromUser(username, roleName);
            return ResponseEntity.ok().body("Role deleted from user");
        } catch (Exception e) {

            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PutMapping("/users/{userId}")
    public void updateUser(@PathVariable String userId, @RequestBody UserRepresentation user) {
        System.out.println(user);
        keycloakService.updateUser(userId, user);
        System.out.println(user);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserRepresentation> getUser(@PathVariable String id) {
        UserRepresentation user = keycloakService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/Users/{roleName}")
    public List<UserRepresentation> getUsersByRole(@PathVariable String roleName) {
        return keycloakService.getUsersByRole(roleName);
    }


}


